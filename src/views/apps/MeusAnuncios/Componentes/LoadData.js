import { toast } from "sonner";
import { getData } from '../../../../Services/Api';



async function loadData (setLoading) {
    setLoading(true);
    const token = localStorage.getItem("token");  
    const currentUserls = JSON.parse(localStorage.getItem('currentUser'));
    try {
      const response = await getData(`announcement/user/${currentUserls.email}`, token);
      console.log(response);
      if(response.status === 200){
        return response.userInfo;
      }else{
        toast.error('Algo deu errado');
        return [];
      }
    }catch(error){
      toast.error('algo deu errado');
      return [];

    }finally{
      setLoading(false);
    }
  }

export default loadData;

