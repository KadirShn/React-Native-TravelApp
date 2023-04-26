import axios from "axios";

export const getPlacesData = async (bl_lat,bl_lng,tr_lat,tr_lng,type) => {
    try{
        
        const {data : {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
        {
            params: {
                bl_latitude: bl_lat ? bl_lat : '40.99249998902024',
                tr_latitude: tr_lat? tr_lat : '41.07799696317434',
                bl_longitude: bl_lng ? bl_lng : '29.00366998849423',
                tr_longitude: tr_lng ? tr_lng :'29.09178901398129',
                currency: 'USD',
                lunit: 'km',
                lang: 'en_US'
              },
              headers: {
                'X-RapidAPI-Key': 'c72428b82bmsh50f1ce2bfce1ed3p19bddbjsn529873057ed3',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
              }
        }
        );
        return data;
    } catch (error) {
        return null
    }
  
}