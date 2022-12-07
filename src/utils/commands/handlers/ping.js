export default async function ping()
{
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('pong')
        }, 1000)
    });
}