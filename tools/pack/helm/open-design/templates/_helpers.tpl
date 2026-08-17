{{- /*
SankiWork Helm chart helpers. Spec §15.5.

Names:
  sankiwork.name        chart-name (`sankiwork`)
  sankiwork.fullname    release-prefixed name (truncated to 63 chars)
  sankiwork.labels      common label set
  sankiwork.selectorLabels   selector subset
*/ -}}

{{- define "sankiwork.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "sankiwork.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{- define "sankiwork.labels" -}}
app.kubernetes.io/name: {{ include "sankiwork.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
helm.sh/chart: {{ printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" }}
{{- end -}}

{{- define "sankiwork.selectorLabels" -}}
app.kubernetes.io/name: {{ include "sankiwork.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
