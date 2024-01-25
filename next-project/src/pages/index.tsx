import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Pagination, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";

// import { GetServerSidePropsContext } from "next";


// Define your types
interface Article {
  title: string;
  url:string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  description: string;
}

interface ApiResponse {
  articles: Article[];
}

const Dashboard = () => {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const token = global?.localStorage?.getItem("token");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("trending");
  const navigate = useRouter();
  const pageSize = 10;
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchingArticles = async () => {
    try {
      const res = await axios.get<ApiResponse>(
        `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`,
      );

      const results = res.data.articles;
      setArticles(results);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchingArticles();
    } else {
      alert("Please log in to your account");
      navigate.push("/Login");
    }
  }, [navigate, page, token]); // Removed searchQuery from dependencies

  const handleSearchClick = () => {
    if (token) {
      setPage(1);
      fetchingArticles();
    } else {
      // alert("Please log in to your account");
      navigate.push("/Login");
    }
  };


  return (
      <Container>
        <div className="flex flex-row my-10 justify-center">
          <TextField
            label="Search Articles"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 w-[500px]"
          />
          <div>
            <Button className="bg-blue-500 w-[80px] h-[55px] rounded-xl mx-2 border-4" variant="contained" color="success" onClick={handleSearchClick}>
              Search
            </Button>
          </div>
        </div>
        {articles?.map((article, index) => (
          <div key={index} className="my-4 p-6 bg-gray-300 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <img src={article.urlToImage} alt="article-image" />
            {/* <Image src={article?.urlToImage} width={400} height={500} alt="article-image" /> */}
            <p className="text-sm text-gray-600 mb-2">
              {article.author} - {new Date(article.publishedAt).toDateString()}
            </p>
            <p className="text-gray-800">{article.description}</p>
            <Button className="bg-blue-500 mt-4 rounded-xl mx-2 border-4" href={article.url} variant="contained" color="success" >go to article</Button>
          </div>
        ))}
        
        <Pagination
          count={5}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          className="mt-4 flex justify-center"
        />
      </Container>
  );
};




export default Dashboard;