import React from 'react'
import { apiKEY } from "../Constants/Constants";

const FetchTvSeries = () => {

    const url = `https://api.themoviedb.org/3/tv/series_id/lists?api_key=${apiKEY}`

    fetch(url)
    .then((res)=>res.json())
    .then((res)=>console.log(res))


  return (
    <div>FetchTvSeries</div>
  )
}

export default FetchTvSeries