import {Container} from "@mui/material";
import {useGetPopularQuery} from "./api/mainPageApi";
export const MainPage=()=>{




    const {data} = useGetPopularQuery()
   console.log(data)
    return <Container maxWidth={"lg"}   sx={{backgroundColor: 'skyblue' }} >
        Main Page
    </Container>
}