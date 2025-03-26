import { getData } from "../../../../Services/Api";

export async function loadPropertyData(setLoading, setProperty, navigate, id) {
    setLoading(true);
    try {
        const response = await getData(`properties/${id}`);
        if (response.status === 200 || response.status === 201) {
            setProperty(response.userInfo);
            console.log(response.userInfo);
        } else {
            navigate('/error');
        }
    } catch (error) {
      navigate('/error');
    } finally {
        setLoading(false);
    }
}