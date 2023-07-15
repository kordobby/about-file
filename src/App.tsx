import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function App() {
  const [fileToUrl, setFileToUrl] = useState<string>("");
  const [blobToUrl, setBlobToUrl] = useState<string>("");
  const [blobToUrl2, setBlobToUrl2] = useState<string>("");
  const [fileToUrlWithReader, setFileToUrlWithReader] = useState<string>("");
  const [bufferToUrl, setBufferToUrl] = useState<string>("");

  const [canvasImg, setCanvasImg] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* 1️⃣ 파일 가져오기 */
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const getFileList = event.target.files;
    console.log("1️⃣ FileList", getFileList);
    if (getFileList) {
      console.log("1️⃣ File", getFileList[0]);

      /* 2️⃣ File To Blob */
      const file: File = getFileList[0];
      const blob: Blob = file;
      console.log("2️⃣ File", getFileList[0]);
      console.log("2️⃣ Blob 👉🏻", blob);

      /* 3️⃣ Blob To File */
      const fileName = file.name;
      const fileType = file.type;
      const BlobToFile = new File([blob], fileName, {
        type: fileType,
      });
      console.log("3️⃣ BlobToFile", BlobToFile);

      const modifiedFileName = "lxxtrue.png";
      const modifiedFileType = "image/png";
      const BlobToFileModified = new File([blob], modifiedFileName, {
        type: modifiedFileType,
      });
      console.log("3️⃣ BlobToFileModified", BlobToFileModified);

      /* 4️⃣ File & Blob to URL */
      const FileToUrl = window.URL.createObjectURL(file);
      const BlobToUrl = window.URL.createObjectURL(blob);
      console.log("4️⃣ FileToUrl", FileToUrl);
      console.log("4️⃣ BlobToUrl 👉🏻", BlobToUrl);
      setFileToUrl(FileToUrl);
      setBlobToUrl(BlobToUrl);

      /* 5️⃣ File & Blob to URL With FileReader */
      const fileToUrlWithFileReader = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = function (finishedEvent: ProgressEvent<FileReader>) {
          const { target } = finishedEvent;
          if (target && target.result) {
            console.log("5️⃣ File & Blob to URL With FileReader", target.result);
            if (typeof target.result === "string") {
              setFileToUrlWithReader(target.result);
            }
          }
        };
        reader.readAsDataURL(file); // TYPE :: base64
      };
      fileToUrlWithFileReader(file);

      /* 6️⃣ URL To Blob */
      const getUrlToBlob = async (url: string) => {
        const response = await fetch(url);
        const UrlToBlob = await response.blob();
        const BlobToUrl = window.URL.createObjectURL(UrlToBlob);
        console.log("6️⃣ UrlToBlob 👉🏻", UrlToBlob);
        console.log("6️⃣ BlobToUrl 👉🏻", BlobToUrl);
        setBlobToUrl2(BlobToUrl);
      };
      getUrlToBlob(BlobToUrl);

      /* 7️⃣ URL with FileReader to Blob */
      const urlWithFileReaderToBlob = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = function (finishedEvent: ProgressEvent<FileReader>) {
          const { target } = finishedEvent;
          if (target && target.result) {
            if (typeof target.result === "string") {
              setFileToUrlWithReader(target.result);
              const UrlWithFileReaderToBlob = new Blob([target.result], {
                type: "image/jpeg",
              });
              console.log(
                "7️⃣ URL with FileReader to Blob",
                UrlWithFileReaderToBlob
              );
            }
          }
        };
        reader.readAsDataURL(file); // TYPE :: base64
      };
      urlWithFileReaderToBlob(file);

      /* 8️⃣ File & Blob to ArrayBuffer */
      const fileToArrayBufferWithFileReader = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = function (finishedEvent: ProgressEvent<FileReader>) {
          const { target } = finishedEvent;
          if (target && target.result) {
            console.log("8️⃣ File & Blob to ArrayBuffer", target.result);
          }
        };
        reader.readAsArrayBuffer(file);
      };
      fileToArrayBufferWithFileReader(file);

      /* 9️⃣ URL to ArrayBuffer */
      const urlToArrayBuffer = async (url: string) => {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const arrayBuffer = await response.arrayBuffer();
          console.log("9️⃣ URL to ArrayBuffer", arrayBuffer);
          return arrayBuffer;
        } catch (error) {
          console.log("🚨 ERROR", error);
          return null;
        }
      };

      urlToArrayBuffer(FileToUrl);

      /* 🔟 ArrayBuffer to Blob */
      const arrayBufferToBlobToUrl = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = function (finishedEvent: ProgressEvent<FileReader>) {
          const { target } = finishedEvent;
          if (target && target.result) {
            const arrayBuffer = target.result as ArrayBuffer;
            const bufferToBlob = new Blob([arrayBuffer], {
              type: file.type,
            });
            const bufferToBlobToURL = URL.createObjectURL(bufferToBlob);
            console.log("🔟 ArrayBuffer to Blob", bufferToBlob);
            console.log("🔟 ArrayBuffer to Blob to URL", bufferToBlobToURL);
            setBufferToUrl(bufferToBlobToURL);
          }
        };
        reader.readAsArrayBuffer(file);
      };
      arrayBufferToBlobToUrl(file);

      /* 🎨 Make Preview with canvas */
      const getPreviewImgWithCanvas = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = function (finishedEvent: ProgressEvent<FileReader>) {
          const { target } = finishedEvent;
          if (target && target.result) {
            const image = new Image();
            image.onload = () => {
              const canvas = canvasRef.current;
              if (canvas) {
                // ✅ getContxt() 메서드를 통해 CanvasRenderingContext2D 구하기
                const context = canvas.getContext("2d");
                if (context) {
                  // ✅ clearRect() => 특정 부분을 지운 직사각형 그리기
                  context.clearRect(0, 0, canvas.width, canvas.height);
                  // ✅ drawImage() => 캔버스에서 이미지를 그려줌
                  context.drawImage(image, 0, 0, canvas.width, canvas.height);
                  // ✅ toDataURL(type, quality) => url 추출 (최고 퀄리티, 두번째 인자 숫자가 낮을 수록 낮은 퀄리티)
                  const imageUrl = canvas.toDataURL("image/png", 1.0);
                  setCanvasImg(imageUrl);
                }
              }
            };
            image.src = reader.result as string;
          }
        };
        reader.readAsDataURL(file);
      };
      getPreviewImgWithCanvas(file);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 200;
      canvas.height = 200;
    }
  }, []);

  return (
    <Layout>
      <Input type="file" id="imgFile" onChange={handleFile} />
      <SectionBox>
        <Section>
          <p>File 을 URL로 변환</p>
          <PreviewImage src={fileToUrl} alt="file-to-url" />
        </Section>
        <Section>
          <p>Blob 을 URL로 변환</p>
          <PreviewImage src={blobToUrl} alt="blob-to-url" />
        </Section>
        <Section>
          <p>Blob 을 URL로 변환한걸 한바퀴 다시 돌림</p>
          <PreviewImage src={blobToUrl2} alt="blob-to-url" />
        </Section>
        <Section>
          <p>FileReader 로 변환한 URL</p>
          <PreviewImage src={fileToUrlWithReader} alt="blob-to-url" />
        </Section>
        <Section>
          <p>Buffer 를 URL로 변환</p>
          <PreviewImage src={bufferToUrl} alt="blob-to-url" />
        </Section>
        <Section>
          <p>canvas 미리보기</p>
          <PreviewImage src={canvasImg} alt="canvas-img" />
          <canvas ref={canvasRef} style={{ display: "none" }} />
        </Section>
      </SectionBox>
    </Layout>
  );
}

export default App;

const Layout = styled.section`
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const SectionBox = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  width: 600px;
`;
const Section = styled.div`
  border: 1px solid gray;
  border-radius: 10px;
  padding: 0px 20px;
  margin-top: 10px;
`;
const Input = styled.input``;

const PreviewImage = styled.img`
  width: 200px;
  height: 200px;
`;
