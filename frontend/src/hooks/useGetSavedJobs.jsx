import { setAllSavedJobs } from "@/redux/jobSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSavedJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/profile/saved-jobs`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllSavedJobs(res.data.savedJobs));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSavedJobs();
    }, [dispatch]);
};

export default useGetSavedJobs;
