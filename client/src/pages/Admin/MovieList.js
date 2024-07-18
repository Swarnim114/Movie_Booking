import React, { useEffect, useState } from "react";
import { Button, Table, Rate } from "antd";
import MovieForm from "./MovieForm";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../calls/movies";
import { useDispatch } from "react-redux";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DeleteMovieModal from "./DeleteMovieModal";

function MovieList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [formType, setFormType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();

  const getData = async () => {
    dispatch(showLoading());
    const response = await getAllMovies();
    setMovies(response.data.map(item => ({ ...item, key: item._id })));
    dispatch(hideLoading());
  };

  const tableHeadings = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (text, data) => (
          <img width="75" height="115" style={{ objectFit: "cover" }} src={data.poster} alt="Poster" />
      ),
    },
    {
      title: "Movie Name",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      render: (text) => `${text} Min`,
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (text, data) => moment(data.releaseDate).format("MM-DD-YYYY"),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      render: (text) => <Rate allowHalf disabled value={text} />,
    },
    {
      title: "Action",
      render: (text, data) => (
          <div>
            <Button onClick={() => { setIsModalOpen(true); setSelectedMovie(data); setFormType("edit"); }}>
              <EditOutlined />
            </Button>
            <Button className="ml-3" onClick={() => { setIsDeleteModalOpen(true); setSelectedMovie(data); }}>
              <DeleteOutlined />
            </Button>
          </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
      <div>
        <div className="d-flex justify-content-end mb-2">
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            Add Movie
          </Button>
        </div>
        <Table columns={tableHeadings} dataSource={movies} />
        {isModalOpen && (
            <MovieForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                formType={formType}
                getData={getData}
            />
        )}
        {isDeleteModalOpen && (
            <DeleteMovieModal
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                getData={getData}
            />
        )}
      </div>
  );
}

export default MovieList;
