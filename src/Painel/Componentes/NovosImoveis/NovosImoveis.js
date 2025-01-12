import { useState, useEffect } from "react";
import {Box,Typography,List,ListItem,ListItemAvatar,ListItemText,Avatar,Skeleton,} from "@mui/material";
import NovosImoveisDialog from "./NovosImoveisDialog";
const ImoveisList = () => {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImovel, setSelectedImovel] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);


//   async function loadImoveis() {
//     setLoading(true);
//     try {
//         const response = await 
        
//     }catch(e){

//     }finally{
//       setLoading(false);
//     }
//   }

  useEffect(() => {
    setTimeout(() => {
      const dataFicticia =[
        {
            "id": "d2926974-0ae5-42f7-aee9-7cf287255462",
            "type": "property",
            "advertiserEmail": "millerallan17@gmail.com",
            "announcementType": "sell",
            "propertyType": "apartment",
            "isHighlight": false,
            "isPublished": true,
            "floor": 3,
            "size": 78,
            "bathrooms": 2,
            "bedrooms": 2,
            "parkingSpaces": 1,
            "description": "Apartamento de 78m² com excelente planta, localizado em uma região estratégica e valorizada. O imóvel dispõe de 2 quartos, sendo 1 suíte aconchegante, 2 banheiros modernos, e ambientes bem iluminados e ventilados. Perfeito para quem busca conforto e praticidade, o apartamento está próximo a escolas, supermercados e outras comodidades. Ideal para viver bem com sua família!",
            "contact": "(81) 99784-2376",
            "financiable": true,
            "negotiable": false,
            "suites": 1,
            "furnished": "no",
            "verified": "verified",
            "timesSeen": 0,
            "createdAt": "2025-01-09T10:46:06.303Z",
            "updatedAt": "2025-01-09T10:46:06.303Z",
            "address": {
                "propertyId": "d2926974-0ae5-42f7-aee9-7cf287255462",
                "cep": "01153000",
                "street": "Rua Vitorino Carmilo",
                "number": "12",
                "city": "São Paulo",
                "state": "SP",
                "neighborhood": "Barra Funda",
                "complement": "Perto da farmacia pague menos",
                "latitude": "-23.5322733",
                "longitude": "-46.6518577"
            },
            "commodities": {
                "propertyId": "d2926974-0ae5-42f7-aee9-7cf287255462",
                "pool": true,
                "grill": false,
                "airConditioning": true,
                "playground": false,
                "eventArea": false,
                "gourmetArea": false,
                "garden": false,
                "porch": false,
                "slab": false,
                "gatedCommunity": true,
                "gym": false,
                "balcony": true,
                "solarEnergy": false,
                "concierge": false,
                "yard": false,
                "elevator": false
            },
            "prices": {
                "propertyId": "d2926974-0ae5-42f7-aee9-7cf287255462",
                "rentPrice": null,
                "sellPrice": 1500,
                "iptu": null,
                "aditionalFees": null
            },
            "shared": false,
            "totalFavorites": 0,
            "pictures": [
                {
                    "id": "71002fde-a0d2-4a65-bda2-df97a239eafb",
                    "propertyId": "d2926974-0ae5-42f7-aee9-7cf287255462",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2Fd2926974-0ae5-42f7-aee9-7cf287255462%2F0ceb2da7f2ad295beaab5e001be05be6%20-%20Copia.jpg?alt=media&token=a765c351-56a7-4b3e-b044-c39c3489871b",
                    "name": "0ceb2da7f2ad295beaab5e001be05be6 - Copia.jpg",
                    "type": "cover",
                    "createdAt": "2025-01-09T10:46:06.303Z",
                    "updatedAt": "2025-01-09T10:46:06.303Z"
                },
                {
                    "id": "0c34ef76-181e-4170-9ee9-bd08630a930b",
                    "propertyId": "d2926974-0ae5-42f7-aee9-7cf287255462",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2Fd2926974-0ae5-42f7-aee9-7cf287255462%2Fea3018d857918e65ee59ca2487ad4af6.jpg?alt=media&token=333b5cd0-0bd8-4319-b090-8b59ae256d09",
                    "name": "ea3018d857918e65ee59ca2487ad4af6.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:46:06.303Z",
                    "updatedAt": "2025-01-09T10:46:06.303Z"
                },
                {
                    "id": "2a4d453d-ca22-4eb6-b669-a0115ea9a539",
                    "propertyId": "d2926974-0ae5-42f7-aee9-7cf287255462",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2Fd2926974-0ae5-42f7-aee9-7cf287255462%2F507e801330754252bd67960a2a07b1c7.jpg?alt=media&token=80a1f49c-858f-44e0-bacb-282eec7facf5",
                    "name": "507e801330754252bd67960a2a07b1c7.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:46:06.303Z",
                    "updatedAt": "2025-01-09T10:46:06.303Z"
                },
                {
                    "id": "5c098f72-181b-4bc9-82eb-fb6e9183631e",
                    "propertyId": "d2926974-0ae5-42f7-aee9-7cf287255462",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2Fd2926974-0ae5-42f7-aee9-7cf287255462%2F389e333dd035432fa79a55a7d855b661.jpg?alt=media&token=bc4a0940-1467-43bd-9906-d767aa5aeec0",
                    "name": "389e333dd035432fa79a55a7d855b661.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:46:06.303Z",
                    "updatedAt": "2025-01-09T10:46:06.303Z"
                },
                {
                    "id": "9962d80d-d131-4b54-a2d5-ff5f002fb597",
                    "propertyId": "d2926974-0ae5-42f7-aee9-7cf287255462",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2Fd2926974-0ae5-42f7-aee9-7cf287255462%2Ffc8674660553b32302272a96f2ab8ace.jpg?alt=media&token=06c9ee86-4831-4164-a3ed-695b2a937285",
                    "name": "fc8674660553b32302272a96f2ab8ace.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:46:06.303Z",
                    "updatedAt": "2025-01-09T10:46:06.303Z"
                }
            ],
            "seller": {
                "email": "millerallan17@gmail.com",
                "name": "Allan Miller ",
                "handler": "millerallan172593",
                "type": "realtor",
                "otpTtl": null,
                "active": true,
                "createdAt": "2025-01-09T02:33:27.348Z",
                "updatedAt": "2025-01-09T10:21:59.402Z",
                "deletedAt": null,
                "info": {
                    "email": "millerallan17@gmail.com",
                    "cpf": "12678032400",
                    "cnpj": null,
                    "rg": "9927296",
                    "creci": "CRECI-PE 32648",
                    "phone": "(81) 99784-2376",
                    "idPhone": null,
                    "bio": "Sou Allan Miller, corretor de imóveis dedicado a ajudar você a encontrar o imóvel perfeito. Com experiência no mercado e uma abordagem personalizada, meu compromisso é oferecer confiança, transparência e um atendimento excepcional em cada etapa da sua jornada imobiliária. Conte comigo para realizar o seu sonho!",
                    "subscription": "free"
                },
                "address": {
                    "email": "millerallan17@gmail.com",
                    "street": "R. Sérgio Émerson da S Carlos",
                    "cep": "55750000",
                    "number": "10",
                    "complement": null,
                    "neighborhood": "Centro",
                    "city": "Surubim",
                    "state": "PE"
                },
                "profile": {
                    "id": "c604d0ea-5d65-464a-b469-1bc87f3ba1bc",
                    "email": "millerallan17@gmail.com",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fusers%2Fmillerallan17%40gmail.com%2F414620577_1092649482083085_7443917943728000026_n.jpg?alt=media&token=",
                    "name": "414620577_1092649482083085_7443917943728000026_n.jpg",
                    "type": "profile",
                    "createdAt": "2025-01-09T10:21:30.061Z",
                    "updatedAt": "2025-01-09T10:21:30.061Z"
                },
                "banner": {
                    "id": "1cfbe4ce-34f9-4257-b178-128bee7343f5",
                    "email": "millerallan17@gmail.com",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fusers%2Fmillerallan17%40gmail.com%2Fwallpaperflare.com_wallpaper%20(2).jpg?alt=media&token=ef680ed2-f067-",
                    "name": "wallpaperflare.com_wallpaper (2).jpg",
                    "type": "banner",
                    "createdAt": "2025-01-09T10:21:59.402Z",
                    "updatedAt": "2025-01-09T10:21:59.402Z"
                },
                "favorites": [],
                "followers": [],
                "follow": [],
                "socials": []
            }
        },
        {
            "id": "359b85dc-7d61-4986-a7cd-32882f6a4787",
            "type": "property",
            "advertiserEmail": "millerallan17@gmail.com",
            "announcementType": "sell",
            "propertyType": "house",
            "isHighlight": false,
            "isPublished": true,
            "floor": 1,
            "size": 90,
            "bathrooms": 2,
            "bedrooms": 2,
            "parkingSpaces": 1,
            "description": "Casa de 90m² com excelente distribuição, ideal para sua família! O imóvel conta com 3 quartos, sendo 1 suíte espaçosa, além de 2 banheiros bem planejados. A casa está localizada em uma área privilegiada, próxima a escolas, comércios e serviços essenciais, garantindo praticidade e qualidade de vida. Um espaço aconchegante, perfeito para quem busca conforto e funcionalidade em um só lugar!",
            "contact": "(81) 99784-2376",
            "financiable": true,
            "negotiable": false,
            "suites": 1,
            "furnished": "no",
            "verified": "verified",
            "timesSeen": 0,
            "createdAt": "2025-01-09T10:41:55.059Z",
            "updatedAt": "2025-01-09T10:41:55.059Z",
            "address": {
                "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                "cep": "50100000",
                "street": "Avenida Norte Miguel Arraes de Alencar",
                "number": "12",
                "city": "Recife",
                "state": "PE",
                "neighborhood": "Santo Amaro",
                "complement": "Perto do mercado de farinha",
                "latitude": "-8.0282742",
                "longitude": "-34.9025498"
            },
            "commodities": {
                "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                "pool": true,
                "grill": true,
                "airConditioning": false,
                "playground": false,
                "eventArea": false,
                "gourmetArea": false,
                "garden": false,
                "porch": false,
                "slab": false,
                "gatedCommunity": true,
                "gym": false,
                "balcony": true,
                "solarEnergy": false,
                "concierge": false,
                "yard": false,
                "elevator": false
            },
            "prices": {
                "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                "rentPrice": null,
                "sellPrice": 1500,
                "iptu": null,
                "aditionalFees": null
            },
            "shared": false,
            "totalFavorites": 0,
            "pictures": [
                {
                    "id": "d721e891-757c-4989-8fa0-2e61deaf6673",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F0ceb2da7f2ad295beaab5e001be05be6%20-%20Copia.jpg?alt=media&token=dbcad6e4-222e-46b9-a94f-3799a71ab0cf",
                    "name": "0ceb2da7f2ad295beaab5e001be05be6 - Copia.jpg",
                    "type": "cover",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "118a992e-9cef-49b0-801e-cfb1b4653de8",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F229d6da24bda221b31f7424fe628f0c4.jpg?alt=media&token=1a960640-24a2-4383-9530-c80fb1404d53",
                    "name": "229d6da24bda221b31f7424fe628f0c4.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "402c53e6-6ce1-4bd4-96ed-b37819ea1588",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F9f18e722622b51be7f98b8f073208869.jpg?alt=media&token=ce727229-1ab6-46a8-9044-44bda6620232",
                    "name": "9f18e722622b51be7f98b8f073208869.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "474c4483-a5ab-4cdd-8ac2-ef2f65fb1ef6",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F507e801330754252bd67960a2a07b1c7.jpg?alt=media&token=21655dd6-4e91-445c-8e93-783afcfb1648",
                    "name": "507e801330754252bd67960a2a07b1c7.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "55c64dda-9b8f-459d-ae3d-3629ebda83e6",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F389e333dd035432fa79a55a7d855b661.jpg?alt=media&token=9211e209-1013-4d23-a235-52ac61d34368",
                    "name": "389e333dd035432fa79a55a7d855b661.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "9e351823-1b2e-4993-8597-43c855cff006",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F8cde0a19ff771f3e31962c1c62335d0b%20-%20Copia.jpg?alt=media&token=99fd3258-6028-48ee-9a6d-341485b83d80",
                    "name": "8cde0a19ff771f3e31962c1c62335d0b - Copia.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                }
            ],
            "seller": {
                "email": "millerallan17@gmail.com",
                "name": "Allan Miller ",
                "handler": "millerallan172593",
                "type": "realtor",
                "otpTtl": null,
                "active": true,
                "createdAt": "2025-01-09T02:33:27.348Z",
                "updatedAt": "2025-01-09T10:21:59.402Z",
                "deletedAt": null,
                "info": {
                    "email": "millerallan17@gmail.com",
                    "cpf": "12678032400",
                    "cnpj": null,
                    "rg": "9927296",
                    "creci": "CRECI-PE 32648",
                    "phone": "(81) 99784-2376",
                    "idPhone": null,
                    "bio": "Sou Allan Miller, corretor de imóveis dedicado a ajudar você a encontrar o imóvel perfeito. Com experiência no mercado e uma abordagem personalizada, meu compromisso é oferecer confiança, transparência e um atendimento excepcional em cada etapa da sua jornada imobiliária. Conte comigo para realizar o seu sonho!",
                    "subscription": "free"
                },
                "address": {
                    "email": "millerallan17@gmail.com",
                    "street": "R. Sérgio Émerson da S Carlos",
                    "cep": "55750000",
                    "number": "10",
                    "complement": null,
                    "neighborhood": "Centro",
                    "city": "Surubim",
                    "state": "PE"
                },
                "profile": {
                    "id": "c604d0ea-5d65-464a-b469-1bc87f3ba1bc",
                    "email": "millerallan17@gmail.com",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fusers%2Fmillerallan17%40gmail.com%2F414620577_1092649482083085_7443917943728000026_n.jpg?alt=media&token=",
                    "name": "414620577_1092649482083085_7443917943728000026_n.jpg",
                    "type": "profile",
                    "createdAt": "2025-01-09T10:21:30.061Z",
                    "updatedAt": "2025-01-09T10:21:30.061Z"
                },
                "banner": {
                    "id": "1cfbe4ce-34f9-4257-b178-128bee7343f5",
                    "email": "millerallan17@gmail.com",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fusers%2Fmillerallan17%40gmail.com%2Fwallpaperflare.com_wallpaper%20(2).jpg?alt=media&token=ef680ed2-f067-",
                    "name": "wallpaperflare.com_wallpaper (2).jpg",
                    "type": "banner",
                    "createdAt": "2025-01-09T10:21:59.402Z",
                    "updatedAt": "2025-01-09T10:21:59.402Z"
                },
                "favorites": [],
                "followers": [],
                "follow": [],
                "socials": []
            }
        }, {
            "id": "359b85dc-7d61-4986-a7cd-32882f6a4787",
            "type": "property",
            "advertiserEmail": "millerallan17@gmail.com",
            "announcementType": "sell",
            "propertyType": "house",
            "isHighlight": false,
            "isPublished": true,
            "floor": 1,
            "size": 90,
            "bathrooms": 2,
            "bedrooms": 2,
            "parkingSpaces": 1,
            "description": "Casa de 90m² com excelente distribuição, ideal para sua família! O imóvel conta com 3 quartos, sendo 1 suíte espaçosa, além de 2 banheiros bem planejados. A casa está localizada em uma área privilegiada, próxima a escolas, comércios e serviços essenciais, garantindo praticidade e qualidade de vida. Um espaço aconchegante, perfeito para quem busca conforto e funcionalidade em um só lugar!",
            "contact": "(81) 99784-2376",
            "financiable": true,
            "negotiable": false,
            "suites": 1,
            "furnished": "no",
            "verified": "verified",
            "timesSeen": 0,
            "createdAt": "2025-01-09T10:41:55.059Z",
            "updatedAt": "2025-01-09T10:41:55.059Z",
            "address": {
                "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                "cep": "50100000",
                "street": "Avenida Norte Miguel Arraes de Alencar",
                "number": "12",
                "city": "Recife",
                "state": "PE",
                "neighborhood": "Santo Amaro",
                "complement": "Perto do mercado de farinha",
                "latitude": "-8.0282742",
                "longitude": "-34.9025498"
            },
            "commodities": {
                "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                "pool": true,
                "grill": true,
                "airConditioning": false,
                "playground": false,
                "eventArea": false,
                "gourmetArea": false,
                "garden": false,
                "porch": false,
                "slab": false,
                "gatedCommunity": true,
                "gym": false,
                "balcony": true,
                "solarEnergy": false,
                "concierge": false,
                "yard": false,
                "elevator": false
            },
            "prices": {
                "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                "rentPrice": null,
                "sellPrice": 1500,
                "iptu": null,
                "aditionalFees": null
            },
            "shared": false,
            "totalFavorites": 0,
            "pictures": [
                {
                    "id": "d721e891-757c-4989-8fa0-2e61deaf6673",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F0ceb2da7f2ad295beaab5e001be05be6%20-%20Copia.jpg?alt=media&token=dbcad6e4-222e-46b9-a94f-3799a71ab0cf",
                    "name": "0ceb2da7f2ad295beaab5e001be05be6 - Copia.jpg",
                    "type": "cover",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "118a992e-9cef-49b0-801e-cfb1b4653de8",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F229d6da24bda221b31f7424fe628f0c4.jpg?alt=media&token=1a960640-24a2-4383-9530-c80fb1404d53",
                    "name": "229d6da24bda221b31f7424fe628f0c4.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "402c53e6-6ce1-4bd4-96ed-b37819ea1588",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F9f18e722622b51be7f98b8f073208869.jpg?alt=media&token=ce727229-1ab6-46a8-9044-44bda6620232",
                    "name": "9f18e722622b51be7f98b8f073208869.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "474c4483-a5ab-4cdd-8ac2-ef2f65fb1ef6",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F507e801330754252bd67960a2a07b1c7.jpg?alt=media&token=21655dd6-4e91-445c-8e93-783afcfb1648",
                    "name": "507e801330754252bd67960a2a07b1c7.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "55c64dda-9b8f-459d-ae3d-3629ebda83e6",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F389e333dd035432fa79a55a7d855b661.jpg?alt=media&token=9211e209-1013-4d23-a235-52ac61d34368",
                    "name": "389e333dd035432fa79a55a7d855b661.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "9e351823-1b2e-4993-8597-43c855cff006",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F8cde0a19ff771f3e31962c1c62335d0b%20-%20Copia.jpg?alt=media&token=99fd3258-6028-48ee-9a6d-341485b83d80",
                    "name": "8cde0a19ff771f3e31962c1c62335d0b - Copia.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                }
            ],
            "seller": {
                "email": "millerallan17@gmail.com",
                "name": "Allan Miller ",
                "handler": "millerallan172593",
                "type": "realtor",
                "otpTtl": null,
                "active": true,
                "createdAt": "2025-01-09T02:33:27.348Z",
                "updatedAt": "2025-01-09T10:21:59.402Z",
                "deletedAt": null,
                "info": {
                    "email": "millerallan17@gmail.com",
                    "cpf": "12678032400",
                    "cnpj": null,
                    "rg": "9927296",
                    "creci": "CRECI-PE 32648",
                    "phone": "(81) 99784-2376",
                    "idPhone": null,
                    "bio": "Sou Allan Miller, corretor de imóveis dedicado a ajudar você a encontrar o imóvel perfeito. Com experiência no mercado e uma abordagem personalizada, meu compromisso é oferecer confiança, transparência e um atendimento excepcional em cada etapa da sua jornada imobiliária. Conte comigo para realizar o seu sonho!",
                    "subscription": "free"
                },
                "address": {
                    "email": "millerallan17@gmail.com",
                    "street": "R. Sérgio Émerson da S Carlos",
                    "cep": "55750000",
                    "number": "10",
                    "complement": null,
                    "neighborhood": "Centro",
                    "city": "Surubim",
                    "state": "PE"
                },
                "profile": {
                    "id": "c604d0ea-5d65-464a-b469-1bc87f3ba1bc",
                    "email": "millerallan17@gmail.com",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fusers%2Fmillerallan17%40gmail.com%2F414620577_1092649482083085_7443917943728000026_n.jpg?alt=media&token=",
                    "name": "414620577_1092649482083085_7443917943728000026_n.jpg",
                    "type": "profile",
                    "createdAt": "2025-01-09T10:21:30.061Z",
                    "updatedAt": "2025-01-09T10:21:30.061Z"
                },
                "banner": {
                    "id": "1cfbe4ce-34f9-4257-b178-128bee7343f5",
                    "email": "millerallan17@gmail.com",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fusers%2Fmillerallan17%40gmail.com%2Fwallpaperflare.com_wallpaper%20(2).jpg?alt=media&token=ef680ed2-f067-",
                    "name": "wallpaperflare.com_wallpaper (2).jpg",
                    "type": "banner",
                    "createdAt": "2025-01-09T10:21:59.402Z",
                    "updatedAt": "2025-01-09T10:21:59.402Z"
                },
                "favorites": [],
                "followers": [],
                "follow": [],
                "socials": []
            }
        }, {
            "id": "359b85dc-7d61-4986-a7cd-32882f6a4787",
            "type": "property",
            "advertiserEmail": "millerallan17@gmail.com",
            "announcementType": "sell",
            "propertyType": "house",
            "isHighlight": false,
            "isPublished": true,
            "floor": 1,
            "size": 90,
            "bathrooms": 2,
            "bedrooms": 2,
            "parkingSpaces": 1,
            "description": "Casa de 90m² com excelente distribuição, ideal para sua família! O imóvel conta com 3 quartos, sendo 1 suíte espaçosa, além de 2 banheiros bem planejados. A casa está localizada em uma área privilegiada, próxima a escolas, comércios e serviços essenciais, garantindo praticidade e qualidade de vida. Um espaço aconchegante, perfeito para quem busca conforto e funcionalidade em um só lugar!",
            "contact": "(81) 99784-2376",
            "financiable": true,
            "negotiable": false,
            "suites": 1,
            "furnished": "no",
            "verified": "verified",
            "timesSeen": 0,
            "createdAt": "2025-01-09T10:41:55.059Z",
            "updatedAt": "2025-01-09T10:41:55.059Z",
            "address": {
                "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                "cep": "50100000",
                "street": "Avenida Norte Miguel Arraes de Alencar",
                "number": "12",
                "city": "Recife",
                "state": "PE",
                "neighborhood": "Santo Amaro",
                "complement": "Perto do mercado de farinha",
                "latitude": "-8.0282742",
                "longitude": "-34.9025498"
            },
            "commodities": {
                "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                "pool": true,
                "grill": true,
                "airConditioning": false,
                "playground": false,
                "eventArea": false,
                "gourmetArea": false,
                "garden": false,
                "porch": false,
                "slab": false,
                "gatedCommunity": true,
                "gym": false,
                "balcony": true,
                "solarEnergy": false,
                "concierge": false,
                "yard": false,
                "elevator": false
            },
            "prices": {
                "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                "rentPrice": null,
                "sellPrice": 1500,
                "iptu": null,
                "aditionalFees": null
            },
            "shared": false,
            "totalFavorites": 0,
            "pictures": [
                {
                    "id": "d721e891-757c-4989-8fa0-2e61deaf6673",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F0ceb2da7f2ad295beaab5e001be05be6%20-%20Copia.jpg?alt=media&token=dbcad6e4-222e-46b9-a94f-3799a71ab0cf",
                    "name": "0ceb2da7f2ad295beaab5e001be05be6 - Copia.jpg",
                    "type": "cover",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "118a992e-9cef-49b0-801e-cfb1b4653de8",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F229d6da24bda221b31f7424fe628f0c4.jpg?alt=media&token=1a960640-24a2-4383-9530-c80fb1404d53",
                    "name": "229d6da24bda221b31f7424fe628f0c4.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "402c53e6-6ce1-4bd4-96ed-b37819ea1588",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F9f18e722622b51be7f98b8f073208869.jpg?alt=media&token=ce727229-1ab6-46a8-9044-44bda6620232",
                    "name": "9f18e722622b51be7f98b8f073208869.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "474c4483-a5ab-4cdd-8ac2-ef2f65fb1ef6",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F507e801330754252bd67960a2a07b1c7.jpg?alt=media&token=21655dd6-4e91-445c-8e93-783afcfb1648",
                    "name": "507e801330754252bd67960a2a07b1c7.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "55c64dda-9b8f-459d-ae3d-3629ebda83e6",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F389e333dd035432fa79a55a7d855b661.jpg?alt=media&token=9211e209-1013-4d23-a235-52ac61d34368",
                    "name": "389e333dd035432fa79a55a7d855b661.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "9e351823-1b2e-4993-8597-43c855cff006",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F8cde0a19ff771f3e31962c1c62335d0b%20-%20Copia.jpg?alt=media&token=99fd3258-6028-48ee-9a6d-341485b83d80",
                    "name": "8cde0a19ff771f3e31962c1c62335d0b - Copia.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                }
            ],
            "seller": {
                "email": "millerallan17@gmail.com",
                "name": "Allan Miller ",
                "handler": "millerallan172593",
                "type": "realtor",
                "otpTtl": null,
                "active": true,
                "createdAt": "2025-01-09T02:33:27.348Z",
                "updatedAt": "2025-01-09T10:21:59.402Z",
                "deletedAt": null,
                "info": {
                    "email": "millerallan17@gmail.com",
                    "cpf": "12678032400",
                    "cnpj": null,
                    "rg": "9927296",
                    "creci": "CRECI-PE 32648",
                    "phone": "(81) 99784-2376",
                    "idPhone": null,
                    "bio": "Sou Allan Miller, corretor de imóveis dedicado a ajudar você a encontrar o imóvel perfeito. Com experiência no mercado e uma abordagem personalizada, meu compromisso é oferecer confiança, transparência e um atendimento excepcional em cada etapa da sua jornada imobiliária. Conte comigo para realizar o seu sonho!",
                    "subscription": "free"
                },
                "address": {
                    "email": "millerallan17@gmail.com",
                    "street": "R. Sérgio Émerson da S Carlos",
                    "cep": "55750000",
                    "number": "10",
                    "complement": null,
                    "neighborhood": "Centro",
                    "city": "Surubim",
                    "state": "PE"
                },
                "profile": {
                    "id": "c604d0ea-5d65-464a-b469-1bc87f3ba1bc",
                    "email": "millerallan17@gmail.com",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fusers%2Fmillerallan17%40gmail.com%2F414620577_1092649482083085_7443917943728000026_n.jpg?alt=media&token=",
                    "name": "414620577_1092649482083085_7443917943728000026_n.jpg",
                    "type": "profile",
                    "createdAt": "2025-01-09T10:21:30.061Z",
                    "updatedAt": "2025-01-09T10:21:30.061Z"
                },
                "banner": {
                    "id": "1cfbe4ce-34f9-4257-b178-128bee7343f5",
                    "email": "millerallan17@gmail.com",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fusers%2Fmillerallan17%40gmail.com%2Fwallpaperflare.com_wallpaper%20(2).jpg?alt=media&token=ef680ed2-f067-",
                    "name": "wallpaperflare.com_wallpaper (2).jpg",
                    "type": "banner",
                    "createdAt": "2025-01-09T10:21:59.402Z",
                    "updatedAt": "2025-01-09T10:21:59.402Z"
                },
                "favorites": [],
                "followers": [],
                "follow": [],
                "socials": []
            }
        }, {
            "id": "359b85dc-7d61-4986-a7cd-32882f6a4787",
            "type": "property",
            "advertiserEmail": "millerallan17@gmail.com",
            "announcementType": "sell",
            "propertyType": "house",
            "isHighlight": false,
            "isPublished": true,
            "floor": 1,
            "size": 90,
            "bathrooms": 2,
            "bedrooms": 2,
            "parkingSpaces": 1,
            "description": "Casa de 90m² com excelente distribuição, ideal para sua família! O imóvel conta com 3 quartos, sendo 1 suíte espaçosa, além de 2 banheiros bem planejados. A casa está localizada em uma área privilegiada, próxima a escolas, comércios e serviços essenciais, garantindo praticidade e qualidade de vida. Um espaço aconchegante, perfeito para quem busca conforto e funcionalidade em um só lugar!",
            "contact": "(81) 99784-2376",
            "financiable": true,
            "negotiable": false,
            "suites": 1,
            "furnished": "no",
            "verified": "verified",
            "timesSeen": 0,
            "createdAt": "2025-01-09T10:41:55.059Z",
            "updatedAt": "2025-01-09T10:41:55.059Z",
            "address": {
                "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                "cep": "50100000",
                "street": "Avenida Norte Miguel Arraes de Alencar",
                "number": "12",
                "city": "Recife",
                "state": "PE",
                "neighborhood": "Santo Amaro",
                "complement": "Perto do mercado de farinha",
                "latitude": "-8.0282742",
                "longitude": "-34.9025498"
            },
            "commodities": {
                "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                "pool": true,
                "grill": true,
                "airConditioning": false,
                "playground": false,
                "eventArea": false,
                "gourmetArea": false,
                "garden": false,
                "porch": false,
                "slab": false,
                "gatedCommunity": true,
                "gym": false,
                "balcony": true,
                "solarEnergy": false,
                "concierge": false,
                "yard": false,
                "elevator": false
            },
            "prices": {
                "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                "rentPrice": null,
                "sellPrice": 1500,
                "iptu": null,
                "aditionalFees": null
            },
            "shared": false,
            "totalFavorites": 0,
            "pictures": [
                {
                    "id": "d721e891-757c-4989-8fa0-2e61deaf6673",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F0ceb2da7f2ad295beaab5e001be05be6%20-%20Copia.jpg?alt=media&token=dbcad6e4-222e-46b9-a94f-3799a71ab0cf",
                    "name": "0ceb2da7f2ad295beaab5e001be05be6 - Copia.jpg",
                    "type": "cover",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "118a992e-9cef-49b0-801e-cfb1b4653de8",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F229d6da24bda221b31f7424fe628f0c4.jpg?alt=media&token=1a960640-24a2-4383-9530-c80fb1404d53",
                    "name": "229d6da24bda221b31f7424fe628f0c4.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "402c53e6-6ce1-4bd4-96ed-b37819ea1588",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F9f18e722622b51be7f98b8f073208869.jpg?alt=media&token=ce727229-1ab6-46a8-9044-44bda6620232",
                    "name": "9f18e722622b51be7f98b8f073208869.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "474c4483-a5ab-4cdd-8ac2-ef2f65fb1ef6",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F507e801330754252bd67960a2a07b1c7.jpg?alt=media&token=21655dd6-4e91-445c-8e93-783afcfb1648",
                    "name": "507e801330754252bd67960a2a07b1c7.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "55c64dda-9b8f-459d-ae3d-3629ebda83e6",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F389e333dd035432fa79a55a7d855b661.jpg?alt=media&token=9211e209-1013-4d23-a235-52ac61d34368",
                    "name": "389e333dd035432fa79a55a7d855b661.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "9e351823-1b2e-4993-8597-43c855cff006",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F8cde0a19ff771f3e31962c1c62335d0b%20-%20Copia.jpg?alt=media&token=99fd3258-6028-48ee-9a6d-341485b83d80",
                    "name": "8cde0a19ff771f3e31962c1c62335d0b - Copia.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                }
            ],
            "seller": {
                "email": "millerallan17@gmail.com",
                "name": "Allan Miller ",
                "handler": "millerallan172593",
                "type": "realtor",
                "otpTtl": null,
                "active": true,
                "createdAt": "2025-01-09T02:33:27.348Z",
                "updatedAt": "2025-01-09T10:21:59.402Z",
                "deletedAt": null,
                "info": {
                    "email": "millerallan17@gmail.com",
                    "cpf": "12678032400",
                    "cnpj": null,
                    "rg": "9927296",
                    "creci": "CRECI-PE 32648",
                    "phone": "(81) 99784-2376",
                    "idPhone": null,
                    "bio": "Sou Allan Miller, corretor de imóveis dedicado a ajudar você a encontrar o imóvel perfeito. Com experiência no mercado e uma abordagem personalizada, meu compromisso é oferecer confiança, transparência e um atendimento excepcional em cada etapa da sua jornada imobiliária. Conte comigo para realizar o seu sonho!",
                    "subscription": "free"
                },
                "address": {
                    "email": "millerallan17@gmail.com",
                    "street": "R. Sérgio Émerson da S Carlos",
                    "cep": "55750000",
                    "number": "10",
                    "complement": null,
                    "neighborhood": "Centro",
                    "city": "Surubim",
                    "state": "PE"
                },
                "profile": {
                    "id": "c604d0ea-5d65-464a-b469-1bc87f3ba1bc",
                    "email": "millerallan17@gmail.com",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fusers%2Fmillerallan17%40gmail.com%2F414620577_1092649482083085_7443917943728000026_n.jpg?alt=media&token=",
                    "name": "414620577_1092649482083085_7443917943728000026_n.jpg",
                    "type": "profile",
                    "createdAt": "2025-01-09T10:21:30.061Z",
                    "updatedAt": "2025-01-09T10:21:30.061Z"
                },
                "banner": {
                    "id": "1cfbe4ce-34f9-4257-b178-128bee7343f5",
                    "email": "millerallan17@gmail.com",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fusers%2Fmillerallan17%40gmail.com%2Fwallpaperflare.com_wallpaper%20(2).jpg?alt=media&token=ef680ed2-f067-",
                    "name": "wallpaperflare.com_wallpaper (2).jpg",
                    "type": "banner",
                    "createdAt": "2025-01-09T10:21:59.402Z",
                    "updatedAt": "2025-01-09T10:21:59.402Z"
                },
                "favorites": [],
                "followers": [],
                "follow": [],
                "socials": []
            }
        }, {
            "id": "359b85dc-7d61-4986-a7cd-32882f6a4787",
            "type": "property",
            "advertiserEmail": "millerallan17@gmail.com",
            "announcementType": "sell",
            "propertyType": "house",
            "isHighlight": false,
            "isPublished": true,
            "floor": 1,
            "size": 90,
            "bathrooms": 2,
            "bedrooms": 2,
            "parkingSpaces": 1,
            "description": "Casa de 90m² com excelente distribuição, ideal para sua família! O imóvel conta com 3 quartos, sendo 1 suíte espaçosa, além de 2 banheiros bem planejados. A casa está localizada em uma área privilegiada, próxima a escolas, comércios e serviços essenciais, garantindo praticidade e qualidade de vida. Um espaço aconchegante, perfeito para quem busca conforto e funcionalidade em um só lugar!",
            "contact": "(81) 99784-2376",
            "financiable": true,
            "negotiable": false,
            "suites": 1,
            "furnished": "no",
            "verified": "verified",
            "timesSeen": 0,
            "createdAt": "2025-01-09T10:41:55.059Z",
            "updatedAt": "2025-01-09T10:41:55.059Z",
            "address": {
                "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                "cep": "50100000",
                "street": "Avenida Norte Miguel Arraes de Alencar",
                "number": "12",
                "city": "Recife",
                "state": "PE",
                "neighborhood": "Santo Amaro",
                "complement": "Perto do mercado de farinha",
                "latitude": "-8.0282742",
                "longitude": "-34.9025498"
            },
            "commodities": {
                "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                "pool": true,
                "grill": true,
                "airConditioning": false,
                "playground": false,
                "eventArea": false,
                "gourmetArea": false,
                "garden": false,
                "porch": false,
                "slab": false,
                "gatedCommunity": true,
                "gym": false,
                "balcony": true,
                "solarEnergy": false,
                "concierge": false,
                "yard": false,
                "elevator": false
            },
            "prices": {
                "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                "rentPrice": null,
                "sellPrice": 1500,
                "iptu": null,
                "aditionalFees": null
            },
            "shared": false,
            "totalFavorites": 0,
            "pictures": [
                {
                    "id": "d721e891-757c-4989-8fa0-2e61deaf6673",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F0ceb2da7f2ad295beaab5e001be05be6%20-%20Copia.jpg?alt=media&token=dbcad6e4-222e-46b9-a94f-3799a71ab0cf",
                    "name": "0ceb2da7f2ad295beaab5e001be05be6 - Copia.jpg",
                    "type": "cover",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "118a992e-9cef-49b0-801e-cfb1b4653de8",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F229d6da24bda221b31f7424fe628f0c4.jpg?alt=media&token=1a960640-24a2-4383-9530-c80fb1404d53",
                    "name": "229d6da24bda221b31f7424fe628f0c4.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "402c53e6-6ce1-4bd4-96ed-b37819ea1588",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F9f18e722622b51be7f98b8f073208869.jpg?alt=media&token=ce727229-1ab6-46a8-9044-44bda6620232",
                    "name": "9f18e722622b51be7f98b8f073208869.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "474c4483-a5ab-4cdd-8ac2-ef2f65fb1ef6",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F507e801330754252bd67960a2a07b1c7.jpg?alt=media&token=21655dd6-4e91-445c-8e93-783afcfb1648",
                    "name": "507e801330754252bd67960a2a07b1c7.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "55c64dda-9b8f-459d-ae3d-3629ebda83e6",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F389e333dd035432fa79a55a7d855b661.jpg?alt=media&token=9211e209-1013-4d23-a235-52ac61d34368",
                    "name": "389e333dd035432fa79a55a7d855b661.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                },
                {
                    "id": "9e351823-1b2e-4993-8597-43c855cff006",
                    "propertyId": "359b85dc-7d61-4986-a7cd-32882f6a4787",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fproperties%2F359b85dc-7d61-4986-a7cd-32882f6a4787%2F8cde0a19ff771f3e31962c1c62335d0b%20-%20Copia.jpg?alt=media&token=99fd3258-6028-48ee-9a6d-341485b83d80",
                    "name": "8cde0a19ff771f3e31962c1c62335d0b - Copia.jpg",
                    "type": "photo",
                    "createdAt": "2025-01-09T10:41:55.059Z",
                    "updatedAt": "2025-01-09T10:41:55.059Z"
                }
            ],
            "seller": {
                "email": "millerallan17@gmail.com",
                "name": "Allan Miller ",
                "handler": "millerallan172593",
                "type": "realtor",
                "otpTtl": null,
                "active": true,
                "createdAt": "2025-01-09T02:33:27.348Z",
                "updatedAt": "2025-01-09T10:21:59.402Z",
                "deletedAt": null,
                "info": {
                    "email": "millerallan17@gmail.com",
                    "cpf": "12678032400",
                    "cnpj": null,
                    "rg": "9927296",
                    "creci": "CRECI-PE 32648",
                    "phone": "(81) 99784-2376",
                    "idPhone": null,
                    "bio": "Sou Allan Miller, corretor de imóveis dedicado a ajudar você a encontrar o imóvel perfeito. Com experiência no mercado e uma abordagem personalizada, meu compromisso é oferecer confiança, transparência e um atendimento excepcional em cada etapa da sua jornada imobiliária. Conte comigo para realizar o seu sonho!",
                    "subscription": "free"
                },
                "address": {
                    "email": "millerallan17@gmail.com",
                    "street": "R. Sérgio Émerson da S Carlos",
                    "cep": "55750000",
                    "number": "10",
                    "complement": null,
                    "neighborhood": "Centro",
                    "city": "Surubim",
                    "state": "PE"
                },
                "profile": {
                    "id": "c604d0ea-5d65-464a-b469-1bc87f3ba1bc",
                    "email": "millerallan17@gmail.com",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fusers%2Fmillerallan17%40gmail.com%2F414620577_1092649482083085_7443917943728000026_n.jpg?alt=media&token=",
                    "name": "414620577_1092649482083085_7443917943728000026_n.jpg",
                    "type": "profile",
                    "createdAt": "2025-01-09T10:21:30.061Z",
                    "updatedAt": "2025-01-09T10:21:30.061Z"
                },
                "banner": {
                    "id": "1cfbe4ce-34f9-4257-b178-128bee7343f5",
                    "email": "millerallan17@gmail.com",
                    "url": "https://firebasestorage.googleapis.com/v0/b/spaceimoveis-72b28.appspot.com/o/images%2Fusers%2Fmillerallan17%40gmail.com%2Fwallpaperflare.com_wallpaper%20(2).jpg?alt=media&token=ef680ed2-f067-",
                    "name": "wallpaperflare.com_wallpaper (2).jpg",
                    "type": "banner",
                    "createdAt": "2025-01-09T10:21:59.402Z",
                    "updatedAt": "2025-01-09T10:21:59.402Z"
                },
                "favorites": [],
                "followers": [],
                "follow": [],
                "socials": []
            }
        }
        
    ];
      setImoveis(dataFicticia);
      setLoading(false);
    }, 2000); // Simula delay de 2 segundos
  }, []);

  const handleImovelClick = (imovel) => {
    setSelectedImovel(imovel);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedImovel(null);
  };

  const type = (type) => {
    if(type === 'house'){
        return 'Casa'
    }else if(type === 'apartment'){
        return 'Apartamento'    
    }else if(type === 'farm'){
        return 'Fazenda/Chácaras'
    }else if(type === 'land'){
        return 'Terreno'
    }
  }  

  return (
    <Box
      sx={{
        width: 350,
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        backgroundColor: "white",
        boxShadow: 1,
      }}
    >
      {/* Cabeçalho */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <Typography variant="h6">Novos Imóveis</Typography>
        <Typography variant="h6" color="primary">{imoveis.length}</Typography>
      </Box>

      {/* Conteúdo */}
      <List>
        {loading
          ? // Skeletons para simular os cards de imóveis
            Array.from({ length:  6}).map((_, index) => (
              <ListItem key={index} sx={{ padding: 0, marginBottom: 2 }}>
                <ListItemAvatar>
                  <Skeleton
                    variant="rectangular"
                    width={55}
                    height={55}
                    sx={{ borderRadius: 1 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={<Skeleton width="60%" />}
                  secondary={<Skeleton width="80%" />}
                  sx={{ marginLeft: 1 }}
                />
              </ListItem>
            ))
          : // Dados reais após carregamento
            imoveis.map((imovel) => (
              <ListItem
                key={imovel.id}
                sx={{ padding: 0, marginBottom: 1, cursor: "pointer" }}
                onClick={() => handleImovelClick(imovel)}
              >
                <ListItemAvatar>
                  <Avatar
                    src={imovel.pictures[0].url}
                    alt={imovel.nome}
                    sx={{ width: 55, height: 55, borderRadius: 1, mr:1  }}
                  />
                </ListItemAvatar>
                <ListItemText
                    primary={type(imovel.propertyType)}
                    secondary={`${imovel.address.street}, ${imovel.address.number} - ${imovel.address.neighborhood} - ${imovel.address.city}, ${imovel.address.state}`}
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    secondaryTypographyProps={{
                        sx: {
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            WebkitLineClamp: 2, // Limita a 2 linhas
                            fontSize: '11px',
                        },
                    }}
                />
              </ListItem>
            ))}
      </List>

      {/* Dialog */}
      <NovosImoveisDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        imovel={selectedImovel}
        setImoveis={setImoveis}
        imoveis={imoveis}
      />
    </Box>
  );
};

export default ImoveisList;
