const dataURLtoFile = (dataURL : string, filename : string) : File => {
    const arr : string[] = dataURL.split(',');
    const mime : string = arr[0].match(/:(.*?);/)?.[1] || '';
    const bstr : string = atob(arr[1]);
    let n : number = bstr.length;
    const u8arr : Uint8Array = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

export default dataURLtoFile;
