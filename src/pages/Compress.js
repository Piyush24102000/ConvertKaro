import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Compress = () => {
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [inputSize, setSize] = useState()

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoader(true)

    const formData = new FormData();
    formData.append("image", file);

    const compressedImage = await fetch(`http://localhost:3000/api/compress?size=${inputSize}`, {
      method: "POST",
      body: formData,
    })
    const responseJson = await compressedImage.json();
    const link = document.createElement('a');
    link.href = responseJson.dataUrl;
    link.setAttribute('download', 'compressed_image.jpg');
    document.body.appendChild(link);

    setLoader(false)
    link.click();

  }

  return (
    <div >
      <Header />

      <div className=" bg-gray-900 min-h-screen pb-4 pt-4">
        <div className="flex items-center justify-center w-full  ">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-900 hover:bg-gray-100 dark:border-gray-900 dark:hover:border-gray-500 dark:hover:bg-gray-700">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" accept="image/jpeg" type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        <div className='text-white text-center'>
          <h1 className='text-xl mb-3 mt-3'>Image Compressor</h1>
          <h1 className='text-xl mb-3 mt-3'>File Details</h1>
          {file && <p>Name : {file.name} , Size : {(file.size / 1024).toFixed(2)} Kb | | {(file.size / 1024 ** 2).toFixed(2)} Mb</p>}
        </div>

        <div className='flex flex-col items-center justify-center mt-10'>
          <input type="number" onChange={(e) => { setSize(e.target.value) }} placeholder="Enter Compressed Size in Kb" className="input input-bordered input-info w-full mx-auto text-white text-center max-w-xs" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Note: Minimum compressed size is 101 Kb</p>

          <div>
            <button onClick={handleSubmit} className="btn btn-outline btn-secondary mt-10">Compress</button>
          </div>
        </div>
        {loader && (
          <div className="absolute  inset-0  flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <img src="/giphy.gif" alt="Loading..." className="h-[750px] w-[1200px]" />
          </div>
        )}

      </div>

      <Footer />
    </div>
  )
}


export default Compress