export function orderAgentsWithSankiWorkFirst<T extends { id: string }>(
  agents: readonly T[],
): T[] {
  const sankiWorkAgents: T[] = [];
  const otherAgents: T[] = [];
  for (const agent of agents) {
    if (agent.id === 'amr') {
      sankiWorkAgents.push(agent);
    } else {
      otherAgents.push(agent);
    }
  }
  return [...sankiWorkAgents, ...otherAgents];
}
