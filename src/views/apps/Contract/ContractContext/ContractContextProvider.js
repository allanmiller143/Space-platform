/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import propTypes from 'prop-types';
import ContractContext from './ContractContext';

function ContractContextProvider({children}){
  const [currentStep,setCurrentStep] = useState(0);
  const [property,setProperty] = useState(null);
  const [loading,setLoading] = useState(false);
  const [history, setHistory] = useState({
  //     "id": 1,
  //     "property": {
  //         "id": "a0971d76-aa00-445d-8bdf-4f6cd6fcfecf",
  //         "type": "property",
  //         "advertiserEmail": "millerallan17@gmail.com",
  //         "announcementType": "rent",
  //         "propertyType": "house",
  //         "isHighlight": false,
  //         "isPublished": true,
  //         "floor": 1,
  //         "size": 200,
  //         "bathrooms": 2,
  //         "bedrooms": 2,
  //         "parkingSpaces": 1,
  //         "description": "ugif i fidgiugfig isdug iudsgui fgdsf",
  //         "contact": "(81) 99617-1889",
  //         "financiable": true,
  //         "negotiable": true,
  //         "suites": 1,
  //         "furnished": "partial",
  //         "verified": "verified",
  //         "timesSeen": 8,
  //         "createdAt": "2025-02-18T19:29:44.284Z",
  //         "updatedAt": "2025-03-30T20:07:53.684Z",
  //         "shared": null,
  //         "address": {
  //             "propertyId": "a0971d76-aa00-445d-8bdf-4f6cd6fcfecf",
  //             "cep": "65048770",
  //             "street": "Rua Maria do Amparo",
  //             "number": "12",
  //             "city": "São Luís",
  //             "state": "MA",
  //             "neighborhood": "Pão de Açúcar",
  //             "complement": "Perto de Carina agiota",
  //             "latitude": "-2.527392",
  //             "longitude": "-44.277191"
  //         },
  //         "commodities": {
  //             "propertyId": "a0971d76-aa00-445d-8bdf-4f6cd6fcfecf",
  //             "pool": true,
  //             "grill": false,
  //             "airConditioning": true,
  //             "playground": true,
  //             "eventArea": true,
  //             "gourmetArea": false,
  //             "garden": false,
  //             "porch": false,
  //             "slab": false,
  //             "gatedCommunity": false,
  //             "gym": false,
  //             "balcony": false,
  //             "solarEnergy": true,
  //             "concierge": false,
  //             "yard": false,
  //             "elevator": false
  //         },
  //         "prices": {
  //             "propertyId": "a0971d76-aa00-445d-8bdf-4f6cd6fcfecf",
  //             "rentPrice": 300,
  //             "sellPrice": null,
  //             "iptu": null,
  //             "aditionalFees": null,
  //             "deposit": 900,
  //             "timesDeposit": 3,
  //             "depositInstallments": 3
  //         },
  //         "totalFavorites": 0,
  //         "pictures": [
  //             {
  //                 "id": "30746f56-310d-4cba-9527-aea6e14a8574",
  //                 "propertyId": "a0971d76-aa00-445d-8bdf-4f6cd6fcfecf",
  //                 "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2Fa0971d76-aa00-445d-8bdf-4f6cd6fcfecf%2F4fa3b3371eb5816cb6350e754166a171.jpg?alt=media&token=18a1512a-056c-4250-92d6-3b27249ca796",
  //                 "name": "4fa3b3371eb5816cb6350e754166a171.jpg",
  //                 "type": "cover",
  //                 "createdAt": "2025-02-18T19:29:44.284Z",
  //                 "updatedAt": "2025-02-18T19:29:44.284Z"
  //             },
  //             {
  //                 "id": "07807ee0-82ca-48c2-b16a-20873e1a94a7",
  //                 "propertyId": "a0971d76-aa00-445d-8bdf-4f6cd6fcfecf",
  //                 "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2Fa0971d76-aa00-445d-8bdf-4f6cd6fcfecf%2F9c5059e30552b37fca9210e5149e93fb.jpg?alt=media&token=6142ac78-54c9-49cb-a4e9-6c8932faddd0",
  //                 "name": "9c5059e30552b37fca9210e5149e93fb.jpg",
  //                 "type": "photo",
  //                 "createdAt": "2025-02-18T19:29:44.284Z",
  //                 "updatedAt": "2025-02-18T19:29:44.284Z"
  //             },
  //             {
  //                 "id": "26614404-73e8-420a-a853-3d3a9a99298e",
  //                 "propertyId": "a0971d76-aa00-445d-8bdf-4f6cd6fcfecf",
  //                 "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2Fa0971d76-aa00-445d-8bdf-4f6cd6fcfecf%2F8cde0a19ff771f3e31962c1c62335d0b%20-%20Copia.jpg?alt=media&token=71c80053-354f-4763-8fbd-f9037f6349a3",
  //                 "name": "8cde0a19ff771f3e31962c1c62335d0b - Copia.jpg",
  //                 "type": "photo",
  //                 "createdAt": "2025-02-18T19:29:44.284Z",
  //                 "updatedAt": "2025-02-18T19:29:44.284Z"
  //             },
  //             {
  //                 "id": "3e08ea8b-491d-4419-b9d2-4b0fc82e78f5",
  //                 "propertyId": "a0971d76-aa00-445d-8bdf-4f6cd6fcfecf",
  //                 "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2Fa0971d76-aa00-445d-8bdf-4f6cd6fcfecf%2F9f18e722622b51be7f98b8f073208869.jpg?alt=media&token=aa077047-4bd6-4daf-8526-7540c162160e",
  //                 "name": "9f18e722622b51be7f98b8f073208869.jpg",
  //                 "type": "photo",
  //                 "createdAt": "2025-02-18T19:29:44.284Z",
  //                 "updatedAt": "2025-02-18T19:29:44.284Z"
  //             },
  //             {
  //                 "id": "7330b276-5b07-45ac-99e1-22b7e359c505",
  //                 "propertyId": "a0971d76-aa00-445d-8bdf-4f6cd6fcfecf",
  //                 "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2Fa0971d76-aa00-445d-8bdf-4f6cd6fcfecf%2F229d6da24bda221b31f7424fe628f0c4%20-%20Copia.jpg?alt=media&token=2b542f30-7607-4823-9371-d8423124e9e2",
  //                 "name": "229d6da24bda221b31f7424fe628f0c4 - Copia.jpg",
  //                 "type": "photo",
  //                 "createdAt": "2025-02-18T19:29:44.284Z",
  //                 "updatedAt": "2025-02-18T19:29:44.284Z"
  //             },
  //             {
  //                 "id": "d6651a5e-18ca-4783-872e-56fd45d0cfed",
  //                 "propertyId": "a0971d76-aa00-445d-8bdf-4f6cd6fcfecf",
  //                 "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2Fa0971d76-aa00-445d-8bdf-4f6cd6fcfecf%2F94d0c2bc2efc5a6ce1806e8dbc82d8e8%20-%20Copia.jpg?alt=media&token=34a42056-a54d-4330-be22-c1c692d13a43",
  //                 "name": "94d0c2bc2efc5a6ce1806e8dbc82d8e8 - Copia.jpg",
  //                 "type": "photo",
  //                 "createdAt": "2025-02-18T19:29:44.284Z",
  //                 "updatedAt": "2025-02-18T19:29:44.284Z"
  //             }
  //         ],
  //         "seller": {
  //             "email": "millerallan17@gmail.com",
  //             "name": "Allan Miller",
  //             "handler": "millerallan179213",
  //             "type": "owner",
  //             "otpTtl": "2025-02-23T22:26:31.269Z",
  //             "active": true,
  //             "createdAt": "2025-02-03T17:17:34.410Z",
  //             "updatedAt": "2025-02-23T22:23:37.583Z",
  //             "deletedAt": null,
  //             "info": {
  //                 "email": "millerallan17@gmail.com",
  //                 "cpf": "12678032400",
  //                 "cnpj": null,
  //                 "rg": "9927296",
  //                 "creci": null,
  //                 "phone": "(81) 99617-1889",
  //                 "idPhone": null,
  //                 "bio": "Sou um dono de imovel em busca de vender seu iimóvel kkk",
  //                 "subscription": "free",
  //                 "highlightLimit": 1,
  //                 "publishLimit": 3
  //             },
  //             "address": {
  //                 "email": "millerallan17@gmail.com",
  //                 "street": "Sergio Emerson da Silva Carlos",
  //                 "cep": "55750000",
  //                 "number": "10",
  //                 "complement": null,
  //                 "neighborhood": "Centro",
  //                 "city": "Surubim",
  //                 "state": "PE"
  //             },
  //             "profile": {
  //                 "id": "4ec0a06e-f570-45c4-b2c5-cbb7911aaaa6",
  //                 "email": "millerallan17@gmail.com",
  //                 "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fusers%2Fmillerallan17%40gmail.com%2F414620577_1092649482083085_7443917943728000026_n.jpg?alt=media&token=",
  //                 "name": "414620577_1092649482083085_7443917943728000026_n.jpg",
  //                 "type": "profile",
  //                 "createdAt": "2025-02-03T23:22:46.266Z",
  //                 "updatedAt": "2025-02-03T23:22:46.266Z"
  //             },
  //             "banner": {
  //                 "id": "4ac7fb7a-ced6-47cf-8ab1-2ba982d5b6e3",
  //                 "email": "millerallan17@gmail.com",
  //                 "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fusers%2Fmillerallan17%40gmail.com%2Fthumb-1920-145172.jpg?alt=media&token=1f93de1b-011a-42f7-8f5a-409c9e2",
  //                 "name": "thumb-1920-145172.jpg",
  //                 "type": "banner",
  //                 "createdAt": "2025-02-23T22:23:37.583Z",
  //                 "updatedAt": "2025-02-23T22:23:37.583Z"
  //             },
  //             "favorites": [
  //                 {
  //                     "id": "450850b0-9ef4-4ce0-af82-94dd0064fdc2",
  //                     "propertyId": "7d2ba677-05b7-41a4-a084-f1510bfc6443",
  //                     "userEmail": "millerallan17@gmail.com",
  //                     "createdAt": "2025-03-18T22:57:00.379Z",
  //                     "updatedAt": "2025-03-18T22:57:00.379Z"
  //                 }
  //             ],
  //             "followers": [],
  //             "follow": [],
  //             "socials": []
  //         }
  //     },
  //     "advertiser": {
  //         "email": "millerallan17@gmail.com",
  //         "name": "Allan Miller",
  //         "handler": "millerallan179213",
  //         "type": "owner",
  //         "otpTtl": "2025-02-23T22:26:31.269Z",
  //         "active": true,
  //         "createdAt": "2025-02-03T17:17:34.410Z",
  //         "updatedAt": "2025-02-23T22:23:37.583Z",
  //         "deletedAt": null,
  //         "info": {
  //             "email": "millerallan17@gmail.com",
  //             "cpf": "12678032400",
  //             "cnpj": null,
  //             "rg": "9927296",
  //             "creci": null,
  //             "phone": "(81) 99617-1889",
  //             "idPhone": null,
  //             "bio": "Sou um dono de imovel em busca de vender seu iimóvel kkk",
  //             "subscription": "free",
  //             "highlightLimit": 1,
  //             "publishLimit": 3
  //         },
  //         "address": {
  //             "email": "millerallan17@gmail.com",
  //             "street": "Sergio Emerson da Silva Carlos",
  //             "cep": "55750000",
  //             "number": "10",
  //             "complement": null,
  //             "neighborhood": "Centro",
  //             "city": "Surubim",
  //             "state": "PE"
  //         },
  //         "profile": {
  //             "id": "4ec0a06e-f570-45c4-b2c5-cbb7911aaaa6",
  //             "email": "millerallan17@gmail.com",
  //             "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fusers%2Fmillerallan17%40gmail.com%2F414620577_1092649482083085_7443917943728000026_n.jpg?alt=media&token=",
  //             "name": "414620577_1092649482083085_7443917943728000026_n.jpg",
  //             "type": "profile",
  //             "createdAt": "2025-02-03T23:22:46.266Z",
  //             "updatedAt": "2025-02-03T23:22:46.266Z"
  //         },
  //         "banner": {
  //             "id": "4ac7fb7a-ced6-47cf-8ab1-2ba982d5b6e3",
  //             "email": "millerallan17@gmail.com",
  //             "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fusers%2Fmillerallan17%40gmail.com%2Fthumb-1920-145172.jpg?alt=media&token=1f93de1b-011a-42f7-8f5a-409c9e2",
  //             "name": "thumb-1920-145172.jpg",
  //             "type": "banner",
  //             "createdAt": "2025-02-23T22:23:37.583Z",
  //             "updatedAt": "2025-02-23T22:23:37.583Z"
  //         },
  //         "favorites": [
  //             {
  //                 "id": "450850b0-9ef4-4ce0-af82-94dd0064fdc2",
  //                 "propertyId": "7d2ba677-05b7-41a4-a084-f1510bfc6443",
  //                 "userEmail": "millerallan17@gmail.com",
  //                 "createdAt": "2025-03-18T22:57:00.379Z",
  //                 "updatedAt": "2025-03-18T22:57:00.379Z"
  //             }
  //         ],
  //         "followers": [],
  //         "follow": [],
  //         "socials": []
  //     },
  //     "client": {
  //         "cep": "55750000",
  //         "street": "R. Sérgio Émerson da S Carlos",
  //         "city": "Surubim",
  //         "neighborhood": "Centro",
  //         "state": "PE",
  //         "fullName": "ALLAN MILLER SILVA LIMA",
  //         "phone": "81997842376",
  //         "email": "millerallan17@gmail.com",
  //         "number": "10",
  //         "cpf": "126.780.324-00",
  //         "maritalStatus": "Divorciado",
  //         "rg": "91.878.415",
  //         "profession": "Empregado"
  //     },
  //     "negociation": {
  //         "seller": "accepted",
  //         "buyer": "accepted"
  //     },
  //     "paymentDay": 10,
  //     "contractDuration": "6 meses",
  //     "proposalType": "rent",
      
  
   });

  const value = {
    currentStep,setCurrentStep,
    property,setProperty,
    loading,setLoading,
    history,setHistory
  };

  return (
    <ContractContext.Provider value = {value}>
      {children}
    </ContractContext.Provider>
  );
}

export default ContractContextProvider;

ContractContextProvider.propTypes = {
  children: propTypes.any,
}.isRequired;
