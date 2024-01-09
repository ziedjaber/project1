import React, { useRef, useState } from 'react';
import './imageGenerator.css';
import default_image from './default_image.svg';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState('/');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const imageGenerator = async () => {
        if (inputRef.current.value === '') {
          return;
        }
      
        setLoading(true);
        try {
          const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`, // Use the API key here
              'User-Agent': 'Chrome',
            },
            body: JSON.stringify({
              prompt: `${inputRef.current.value}`,
              n: 1,
              size: '512x512',
            }),
          });
      
          if (!response.ok) {
            throw new Error('Image generation failed.');
          }
      
          const data = await response.json();
          const data_array = data.data;
          setImage_url(data_array[0].url);
        } catch (error) {
          console.error('Error generating image:', error);
        } finally {
          setLoading(false);
        }
      };
    return (
        <div className='ai-image-generator'>
            <div className='header'>
                Ai image <span>generator</span>
            </div>
            <div className='img-loading'>
                <div className='image'>
                    <img src={image_url === '/' ? default_image : image_url} alt='Generated' />
                    <div className='loading'>
                        <div className={loading ? 'loading-bar-full' : 'loading-bar'}>
                            <div className={loading ? 'loading-text' : 'display-none'}>Loading.....</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='searchbox'>
                <input type='text' ref={inputRef} className='search-input' placeholder='Describe your image' />
                <button className='generate-btn' onClick={imageGenerator}>
                    Generate
                </button>
            </div>
        </div>
    );
};

export default ImageGenerator;
