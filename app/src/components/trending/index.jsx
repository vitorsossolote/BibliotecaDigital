import { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { CardHorizontalBook } from './books/'

export function TrendingBooks() {
    const[books, setBooks] = useState([])

    useEffect(() => {
        async function getBook(){
            const response = await fetch("http://localhost:8085/")
            const data = response.json()
            console.log(data);
        }

        getBook();
    }, [])

 return (
    <FlatList
    data={books}
    renderItem={({ item }) => <CardHorizontalBook/>}
    horizontal={true}/>
  );
}