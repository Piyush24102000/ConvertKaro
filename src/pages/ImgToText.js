import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ImgToText = () => {
    const [file, setFile] = useState(null);

    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("image", file);

        const extractedText = await fetch(`https://convert-karo-6yxz.vercel.app/api/imgtext`, {
            method: "POST",
            body: formData,
        })


        const text = await extractedText.text();

        const filename = 'extracted_text.txt';
        const blob = new Blob([text], { type: 'text/plain' });
    
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, filename);
        } else {
          const link = document.createElement('a');
          const url = URL.createObjectURL(blob);
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }, 0);
        }
      };


    return (
        <>
            <Header />
            <div className=" bg-gray-900 min-h-screen pb-4 pt-4">
                <div className="flex items-center justify-center w-full  ">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-900 hover:bg-gray-100 dark:border-gray-900 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF </p>
                        </div>
                        <input onChange={(e) => { setFile(e.target.files[0]) }} id="dropzone-file" accept="image/*" type="file" className="hidden" />
                    </label>
                </div>
                <div className='text-white text-center'>
                    <h1 className='text-xl mb-3 mt-3'>Image To Text Convertor</h1>
                    <h1 className='text-xl mb-3 mt-4'>File Details</h1>
                    {file && <p>Name : {file.name} , Size : {(file.size / 1024).toFixed(2)} Kb | | {(file.size / 1024 ** 2).toFixed(2)} Mb</p>}
                    <div>
                        <button onClick={handleClick} className="btn btn-outline btn-accent mt-10">Convert</button>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default ImgToText
