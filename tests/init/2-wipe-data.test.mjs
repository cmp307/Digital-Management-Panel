export const NAME = "Wipe Database";
export const PARENT_NAME = "init";

export default async (page) => new Promise(async (resolve, reject) => {
    try {
        await fetch('http://127.0.0.1:3001/api/assets/software/', { method: 'DELETE' });
        await fetch('http://127.0.0.1:3001/api/assets/hardware/', { method: 'DELETE' });
        await fetch('http://127.0.0.1:3001/api/assets/employees/', { method: 'DELETE' });
    
        return resolve(true);
    } catch (error) {
        reject(error)
    }
});