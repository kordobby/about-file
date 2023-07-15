import styled from "styled-components";

function App() {
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("target Value 👉🏻", event.target.value); // C:\fakepath\Group 208.jpg
    console.log("target File 👉🏻", event.target.files); // File object...
    const file = event.target.files;
    console.log("File Type 👉🏻", typeof file); // object
  };

  return (
    <Layout>
      <Input type="file" id="imgFile" onChange={handleFile} />
    </Layout>
  );
}

export default App;

const Layout = styled.section`
  width: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  /* width: 500px;
  height: 50px;
  border-radius: 20px; */
`;
