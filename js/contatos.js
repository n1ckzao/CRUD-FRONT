'use strict'

export async function getContatos() {
    const url = 'https://bakcend-fecaf-render.onrender.com/contatos/'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return data
}

export async function getContatosPorNome(nome) {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos?nome_like=^${nome}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return data
}

export async function postContatos(contato){
    const url = 'https://bakcend-fecaf-render.onrender.com/contatos/'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contato)
    }
    const response = await fetch(url, options)

    return response.ok
}

export async function uploadImageToAzure(uploadParams) {

    const { file, storageAccount, sasToken, containerName } = uploadParams

    const blobName = `${Date.now()}-${file.name}`

    const baseUrl = `https://${storageAccount}.blob.core.windows.net/${containerName}/${blobName}`
    const uploadUrl = `${baseUrl}?${sasToken}`

    const options = {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file,
    }

    const response = await fetch(uploadUrl, options)

    if (response.ok) {
      return baseUrl
    }else {
      return response.ok
    }
   
}
const uploadParams = {
    file: document.getElementById('foto').files[0],
    storageAccount: 'storageimagesfront',
    sasToken: 'sp=racwl&st=2025-05-13T17:39:49Z&se=2025-07-01T01:39:49Z&sv=2024-11-04&sr=c&sig=9p60y93yaq36%2B4jcIQBCj9ae5GMSb5m24p6tAIUnFLE%3D',
    containerName: 'fotos',
}

await uploadImageToAzure(uploadParams)