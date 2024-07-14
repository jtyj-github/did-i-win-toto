const _importDynamic = new Function('modulePath', 'return import(modulePath)');

export async function fetch(...args: any[]): Promise<Response> {
    const { default: fetch } = await _importDynamic('node-fetch');
    return fetch(...args);
}
