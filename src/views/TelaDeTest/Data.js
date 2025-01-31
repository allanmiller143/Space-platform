  import { getData } from 'src/Services/Api';
  
  async function GetUserProperties ( navigate,setLoading,id) {
    setLoading(true);
    const email = id.replaceAll('-', '.');
    console.log(email);
    try {
      const route = `properties/seller/${email}?limit=200`;
      const response = await getData(route);
      if (response.status === 200 || response.status === 201) {
        return response.userInfo.properties
      } 
      else {
        navigate('/error');
      }
    } catch (error) {
      navigate('/error');
    }finally {
      setLoading(false);
    } 
  }

  export { GetUserProperties };