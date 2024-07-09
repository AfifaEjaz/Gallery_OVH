import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';

interface Image {
  id: number;
  previewURL: string;
  user: string;
}

const App = () => {

  // const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  // console.log(apiKey);

  const [images, setImages] = useState<Image[]>([]);
  const [originalImages, setOriginalImages] = useState<Image[]>([]);

  useEffect(() => {
    axios.get("https://pixabay.com/api/?key=44840441-a9c578a6b359a9407b58bfa25&")
      .then((response) => {
        setImages(response.data.hits);
        setOriginalImages(response.data.hits);
        console.log(response.data.hits);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    filterImages(e.target.value);
  }

  const filterImages = (query: string) => {
    if (!query) {
      setImages(originalImages);
      return;
    }

    const filteredImages = originalImages.filter((img) =>
      img.user.toLowerCase().includes(query.toLowerCase())
    );
    setImages(filteredImages);
  }

  return (
    <>
      <div className="container">
        <h1 className='text-center text-secondary'>PHOTO GALLERY</h1>
        <input
        className='w-100 py-2' 
        type="search" 
        name="searchImage" 
        placeholder='Search' 
        onChange={handleSearchChange} />
        
        <div className="row w-100">
          {images.map((val) => (
            <div key={val.id} className="col-sm-3 my-3">
              <Card style={{ width: '100%', cursor: 'pointer' }} className='shadow-lg hover-overlay'>
                <a href={val.previewURL} target='_blank'>

                  <Card.Img
                    className="img img-fluid"
                    variant="top"
                    src={val.previewURL}
                    style={{ height: '15rem' }}
                  />
                </a>
                <Card.Body>
                  <Card.Title>{val.user}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App;

