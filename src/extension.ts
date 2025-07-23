/**
 * Extension function type - takes a client and returns new actions
 */
export type ClientExtension<TClient, TNewActions = {}> = (client: TClient) => TNewActions;

/**
 * Extended client type - combines base client with new actions
 */
export type ExtendedClient<TClient, TNewActions = {}> = TClient & TNewActions;

/**
 * Creates an extend function for a client
 */
export function createExtendFunction<TClient>(client: TClient) {
  return function extend<TNewActions>(
    extension: ClientExtension<TClient, TNewActions>
  ): ExtendedClient<TClient, TNewActions> {
    const newActions = extension(client);
    return { ...client, ...newActions } as ExtendedClient<TClient, TNewActions>;
  };
}
