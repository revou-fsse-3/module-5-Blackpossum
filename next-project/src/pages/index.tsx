import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Pagination, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";


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
  // const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  const token = global?.localStorage?.getItem("token") || "";
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("trending");
  const navigate = useRouter();
  const pageSize = 10;

  const [articles, setArticles] = useState<Article[]>([]);

  const fetchingArticles = async () => {
    try {
      const res = await axios.get<ApiResponse>(
        `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=6186b9b3520c4bc0b4e53f7246628ac7&page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const results = res.data.articles;
      setArticles(results);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchingArticles();
    } else {
      alert("Please log in to your account");
      navigate.push("/");
    }
  }, [fetchingArticles, navigate, page]); // Removed searchQuery from dependencies

  const handleSearchClick = () => {
    if (localStorage.getItem("token")) {
      setPage(1);
      fetchingArticles();
    } else {
      alert("Please log in to your account");
      navigate.push("/login");
    }
  };

  return (
    <div>
      <Container>
        <div className="flex flex-row my-10 justify-center">
          <TextField
            label="Search Articles"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 w-[500px]"
          />
          <Button className="bg-blue-500 w-[80px] h-[55px] rounded-xl mx-2 border-4" variant="contained" color="success" onClick={handleSearchClick}>
            Search
          </Button>
        </div>
        {articles?.map((article, index) => (
          <div key={index} className="my-4 p-6 bg-gray-100 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <Image src={article.urlToImage} width={400} height={500} alt="article-image" />
            <p className="text-sm text-gray-600 mb-2">
              {article.author} - {new Date(article.publishedAt).toDateString()}
            </p>
            <p className="text-gray-800">{article.description}</p>
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
    </div>
  );
};

export default Dashboard;