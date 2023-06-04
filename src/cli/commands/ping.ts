export default async function ping(): Promise<SimpleCommandResult>
{
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('pong')
        }, 1000)
    });
}
