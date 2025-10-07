
export default function sessionStorageManager(appName) {

    const sessionStorageList = [

    ];

    for (let i = 0; i < sessionStorageList.length; i++) {
        if (appName !== sessionStorageList[i].name){
            console.log(appName);
            for (let j = 0; j < sessionStorageList[i].sessionList.length; j++) {
                sessionStorage.removeItem(sessionStorageList[i].sessionList[j]);
            }
        }
    };
}
