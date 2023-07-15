import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// function App() {
//   const [imgFile, setImageFile] = useState<FileList | null>(null);
//   const [imgUrl, setImageUrl] = useState<string>("");
//   const [fileReaderUrl, setFileReaderUrl] = useState<string>("");
//   // const [bufferArrayImg, setBufferArrayImg] = useState<string>("");
//   const [bufferToBlobImg, setBufferToBlobImg] = useState<string>();
//   const imgRef = useRef<HTMLImageElement>(null);
//   const imgReaderRef = useRef<HTMLImageElement>(null);
//   const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
//     console.log("Target Value 👉🏻", event.target.value); // C:\fakepath\Group 208.jpg
//     console.log("Target File 👉🏻", event.target.files); // File object...
//     const file = event.target.files;
//     console.log("File Type 👉🏻", typeof file); // FileList
//     console.log("File Type 👉🏻", typeof file?.[0]); // FileList

//     setImageFile(file);

//     // (method) FileReader.readAsArrayBuffer(blob: Blob): void
//     if (file) {
//       /* File To Blob */
//       const fileBlock: File = file[0];
//       const blobBlock: Blob = fileBlock;

//       /* Blob To File */
//       const fileName = "leetrue.jpeg";
//       const fileType = "image/jpeg";
//       const ModifiedBlobToFile: File = new File([blobBlock], fileName, {
//         type: fileType,
//       });
//       console.log("File to Blob", ModifiedBlobToFile);

//       /* File To Url */
//       const imgElement = imgRef.current;
//       // 인자로 File객체를 받으며, 해당 file의 고유 URL 정보 생성하고 반환
//       const url = window.URL.createObjectURL(file[0]); // createObjectURL(obj: Blob | MediaSource): string
//       setImageUrl(url);
//       if (imgElement) {
//         imgElement.onload = function () {
//           // file 로드가 완료되면, 더이상 URL정보는 사용되지 않으므로 메모리 누수 방지를 위해 해체
//           window.URL.revokeObjectURL(imgUrl); //  (method) revokeObjectURL(url: string): void
//         };
//       }

//       /* Blob To Url */
//       const blobUrl: string = window.URL.createObjectURL(blobBlock);

//       /* Url To Blob */
//       const getUrlToBlob = async () => {
//         const response = await fetch(blobUrl);
//         const UrlToBlob = await response.blob();
//         console.log(UrlToBlob, "URL TO BLOB");
//       };
//       getUrlToBlob();

//       /* Url To ArrayBuffer */
//       const getUrlToBuffer = async () => {
//         try {
//           const response = await fetch(url);
//           if (!response.ok) {
//             throw new Error("ERROR");
//           }
//           const arrayBuffer = await response.arrayBuffer();
//           console.log(arrayBuffer, "urlToBuffer");
//           return arrayBuffer;
//         } catch (error) {
//           console.log(error, "ERROR");
//           return null;
//         }
//       };
//       getUrlToBuffer();
//       /* FileReader 객체를 사용해서 접근하기 */
//       const imgReaderElement = imgReaderRef.current;
//       readFileWithFileReaderToUrl(file[0]);
//       readFileWithFileReaderToArrayBuffer(file[0]); // TYPE :: base64
//       // Failed to execute 'readAsArrayBuffer' on 'FileReader': The object is already busy reading Blobs.
//       // reader.readAsDataURL(file[0]); // TYPE :: base64
//       // reader.readAsArrayBuffer(file[0]); // TYPE :: ArrayBuffer
//       // reader.readAsBinaryString(file[0]); // TYPE :: string | ArrayBuffer
//       // reader.readAsText(file[0]); // TYPE :: string
//     }
//   };

//   const readFileWithFileReaderToUrl = (file: File) => {
//     const reader = new FileReader();
//     reader.onloadend = function (finishedEvent: ProgressEvent<FileReader>) {
//       const { target } = finishedEvent;
//       if (target && target.result) {
//         console.log("Loaded Image", target.result);
//         console.log("Loaded Image Type", typeof target.result);
//         if (typeof target.result === "string") {
//           setFileReaderUrl(target.result);
//         }
//       }
//     };
//     reader.readAsDataURL(file); // TYPE :: base64
//   };

//   const readFileWithFileReaderToArrayBuffer = (file: File) => {
//     const reader = new FileReader();
//     reader.onloadend = function (finishedEvent: ProgressEvent<FileReader>) {
//       const { target } = finishedEvent;
//       if (target && target.result) {
//         console.log("Loaded Image", target.result);
//         const blobSource = new Blob([target.result], {
//           type: "image/jpeg",
//         });
//         console.log(blobSource, "Buffer to Blob");
//         const bufferToBlobToUrl = URL.createObjectURL(blobSource);
//         setBufferToBlobImg(bufferToBlobToUrl);
//       }
//     };
//     reader.readAsArrayBuffer(file); // TYPE :: base64
//   };

//   return (
//     <Layout>
//       <Input type="file" id="imgFile" onChange={handleFile} />
//       {/* 'FileList | null' 형식은 'string | undefined' 형식에 할당할 수 없습니다. */}
//       {/* <img src={imgFile} alt="img" /> */}
//       <ImageByUrl ref={imgRef} src={imgUrl} alt="img-url" />
//       <ImageByUrl ref={imgRef} src={fileReaderUrl} alt="img-reader" />
//       {/* <ImageByUrl ref={imgRef} src={bufferArrayImg} alt="buffer-array" /> */}
//       <ImageByUrl ref={imgRef} src={bufferToBlobImg} alt="img-buffer-blob" />
//     </Layout>
//   );
// }
function App() {
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("Target Value 👉🏻", event.target.value);
    const getFileList = event.target.files;
    // console.log("FileList 👉🏻", getFileList);
    if (getFileList) {
      // console.log("File 👉🏻", getFileList[0]);

      /* File To Blob */
      const file: File = getFileList[0];
      const blob: Blob = file;
      console.log("File 👉🏻", file);
      console.log("Blob 👉🏻", blob);

      /* Blob To File */
      const fileName = file.name;
      const fileType = file.type;
      const BlobToFile = new File([blob], fileName, {
        type: fileType,
      });
      console.log("BlobToFile 👉🏻", BlobToFile);

      const modifiedFileName = "lxxtrue.png";
      const modifiedFileType = "image/png";
      const BlobToFileModified = new File([blob], modifiedFileName, {
        type: modifiedFileType,
      });
      console.log("BlobToFileModified 👉🏻", BlobToFileModified);
    }
  };

  return (
    <Layout>
      <Input type="file" id="imgFile" onChange={handleFile} />
    </Layout>
  );
}

export default App;

const Layout = styled.section`
  /* width: 100vh;
  height: 100vh; */
  padding: 30px;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-direction: column;
`;

const Input = styled.input`
  /* width: 500px;
  height: 50px;
  border-radius: 20px; */
`;

const ImageByUrl = styled.img`
  width: 200px;
  height: 200px;
`;
