export async function copyPasswordWithAutoClear(password, timeout = 10000) {

  try {

    await navigator.clipboard.writeText(password);

    setTimeout(async () => {

      try {

        await navigator.clipboard.writeText("");

      } catch {
        console.warn("Auto clear blocked by browser");
      }

    }, timeout);

    return `Password copied. Clipboard will clear in ${timeout/1000} seconds.`;

  } catch {

    return "Clipboard copy failed.";

  }

}


export async function clearClipboardManual(){

  try{

    await navigator.clipboard.writeText("");

    return "Clipboard cleared manually.";

  }catch{

    return "Manual clipboard clear failed.";

  }

}