import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import { create } from "ipfs-http-client";
import abi from './artifacts/contracts/nft.sol/MyNFT.json';

// 0x320c1d7e84FEA2C9f512Dd47f98b8F479934a64F

const contractABI = abi.abi;
const contractAddress = "0x320c1d7e84FEA2C9f512Dd47f98b8F479934a64F";
const client = create( 'https://ipfs.infura.io:5001/api/v0' );

function App () {
  const [ fileUrl, updateFileUrl ] = useState( `` );
  const [ metaurl, updatemetaUrl ] = useState( `` );

  async function uploadImageHandler ( e ) {
    const file = e.target.files[ 0 ]
    try {
      const added = await client.add( file )
      const url = `https://ipfs.infura.io/ipfs/${ added.path }`
      updateFileUrl( url );
      const { ethereum } = window;

      if ( typeof ethereum !== 'undefined' ) {
        console.log( 'MetaMask is installed!' );
        const provider = new ethers.providers.Web3Provider( ethereum );
        const signer = provider.getSigner();
        const contract = new ethers.Contract( contractAddress, contractABI, signer );
        console.log( contract );
        console.log( added, url );

        const stringurl = url.toString();
        const metadata =
        {
          "description": "I love Cricket",
          "external_url": "",
          "image": stringurl,
          "name": "Anushka Gupta",
          "attributes": [
            {
              "trait_type": "Profession",
              "value": "All-rounder"
            },
            {
              "trait_type": "Age",
              "value": "20"
            },
            {
              "trait_type": "runs",
              "value": "2500"
            },
          ],
        }
        console.log( metadata );
        const metadata_string = JSON.stringify( metadata );
        const textipfs = await client.add( metadata_string );
        const metadataurl = `https://ipfs.infura.io/ipfs/${ textipfs.path }`
        updatemetaUrl( metadataurl );

        const tokenID = await contract.mintToken( metadataurl );

        console.log( tokenID );
      }
      else {
        console.log( "Metamask not found" );
      }

    } catch ( error ) {
      console.log( 'Error uploading file: ', error )
    }
  }

  return (
    <div className="App">

      <input placeholder="Upload file" type="file" onChange={ uploadImageHandler } className="uploadImageButton"></input>

      <div>
        {
          fileUrl && (
            <div> { fileUrl } </div>
          )
        }
      </div>

      <div>
        {
          metaurl && (
            <div> { metaurl } </div>
          )
        }
      </div>

      <div>
        {
          fileUrl && (
            <img src={ fileUrl } width="350 px" />
          )
        }
      </div>

    </div>
  );
}

export default App;
