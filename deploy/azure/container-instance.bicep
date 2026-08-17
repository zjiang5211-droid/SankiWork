targetScope = 'resourceGroup'

@description('Azure region for the SankiWork container group and storage account.')
param location string = resourceGroup().location

@description('Container group name.')
param containerGroupName string = 'sankiwork'

@description('DNS label for the Azure Container Instances upstream endpoint. Must be unique in the selected region.')
param dnsNameLabel string = toLower('sankiwork-${uniqueString(resourceGroup().id, location)}')

@description('SankiWork container image.')
param image string = 'ghcr.io/nexu-io/od:latest'

@secure()
@description('Required SankiWork API token. Generate with: openssl rand -hex 32')
param odApiToken string

@description('Comma-separated browser-visible origins allowed by the daemon. Set this to the authenticated reverse proxy origin, for example https://od.example.com.')
param allowedOrigins string = ''

@description('Node.js heap cap inside the container.')
param nodeOptions string = '--max-old-space-size=192'

@description('CPU cores requested by the container.')
@minValue(1)
param cpuCores int = 1

@description('Memory requested by the container in GiB.')
@minValue(1)
param memoryInGB int = 1

@description('Azure Files share quota in GiB for persistent SankiWork data.')
@minValue(1)
@maxValue(5120)
param fileShareQuotaGB int = 10

var storageAccountName = take(toLower('od${uniqueString(resourceGroup().id, location)}'), 24)
var fileShareName = 'sankiworkdata'
var appPort = 7456

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    allowBlobPublicAccess: false
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
  }
}

resource fileService 'Microsoft.Storage/storageAccounts/fileServices@2023-05-01' = {
  parent: storageAccount
  name: 'default'
}

resource dataShare 'Microsoft.Storage/storageAccounts/fileServices/shares@2023-05-01' = {
  parent: fileService
  name: fileShareName
  properties: {
    accessTier: 'TransactionOptimized'
    shareQuota: fileShareQuotaGB
  }
}

resource containerGroup 'Microsoft.ContainerInstance/containerGroups@2023-05-01' = {
  name: containerGroupName
  location: location
  properties: {
    osType: 'Linux'
    restartPolicy: 'Always'
    sku: 'Standard'
    ipAddress: {
      type: 'Public'
      dnsNameLabel: dnsNameLabel
      ports: [
        {
          protocol: 'TCP'
          port: appPort
        }
      ]
    }
    containers: [
      {
        name: 'sankiwork'
        properties: {
          image: image
          ports: [
            {
              protocol: 'TCP'
              port: appPort
            }
          ]
          environmentVariables: [
            {
              name: 'NODE_ENV'
              value: 'production'
            }
            {
              name: 'NODE_OPTIONS'
              value: nodeOptions
            }
            {
              name: 'SW_BIND_HOST'
              value: '0.0.0.0'
            }
            {
              name: 'SW_PORT'
              value: string(appPort)
            }
            {
              name: 'SW_WEB_PORT'
              value: string(appPort)
            }
            {
              name: 'SW_DATA_DIR'
              value: '/app/.sankiwork'
            }
            {
              name: 'SW_ALLOWED_ORIGINS'
              value: allowedOrigins
            }
            {
              name: 'SW_API_TOKEN'
              secureValue: odApiToken
            }
          ]
          resources: {
            requests: {
              cpu: cpuCores
              memoryInGB: memoryInGB
            }
          }
          volumeMounts: [
            {
              name: 'sankiwork-data'
              mountPath: '/app/.sankiwork'
              readOnly: false
            }
          ]
          livenessProbe: {
            httpGet: {
              path: '/api/health'
              port: appPort
              scheme: 'http'
            }
            initialDelaySeconds: 30
            periodSeconds: 30
            failureThreshold: 3
            timeoutSeconds: 5
          }
        }
      }
    ]
    volumes: [
      {
        name: 'sankiwork-data'
        azureFile: {
          shareName: dataShare.name
          storageAccountName: storageAccount.name
          storageAccountKey: listKeys(storageAccount.id, storageAccount.apiVersion).keys[0].value
          readOnly: false
        }
      }
    ]
  }
}

output daemonFqdn string = containerGroup.properties.ipAddress.fqdn
output proxyUpstreamUrl string = 'http://${containerGroup.properties.ipAddress.fqdn}:${appPort}'
output storageAccountName string = storageAccount.name
output fileShareName string = dataShare.name
