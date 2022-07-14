async function main () {

  const [ deployer ] = await ethers.getSigners();
  const social = await ethers.getContractFactory( "MyNFT" );
  const sociald = await social.deploy();
  console.log( "Contract address: " + sociald.address );
}

main()
  .then( () => process.exit( 0 ) )
  .catch( ( error ) => {
    console.error( error );
    process.exit( 1 );
  } );