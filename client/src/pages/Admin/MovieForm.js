import { Col, Modal, Row, Form, Input, Select, Button, message, Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { addMovie, updateMovie } from "../../calls/movies";
import moment from "moment";

const MovieForm = ({
                     isModalOpen,
                     setIsModalOpen,
                     selectedMovie,
                     setSelectedMovie,
                     formType,
                     getData,
                   }) => {
  const dispatch = useDispatch();

  if (selectedMovie) {
    selectedMovie.releaseDate = moment(selectedMovie.releaseDate).format("YYYY-MM-DD");
  }

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response = null;
      if (formType === "add") {
        response = await addMovie(values);
        setSelectedMovie(null);
      } else {
        response = await updateMovie({ ...values, movieId: selectedMovie._id });
        setSelectedMovie(null);
      }
      if (response.success) {
        getData();
        message.success(response.message);
        setIsModalOpen(false);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
      <Modal
          centered
          title={formType === "add" ? "Add Movie" : "Edit Movie"}
          open={isModalOpen}
          onCancel={handleCancel}
          width={800}
      >
        <Form
            layout="vertical"
            style={{ width: "100%" }}
            initialValues={selectedMovie}
            onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                  label="Movie Name"
                  name="title"
                  rules={[{ required: true, message: "Movie name is required!" }]}
              >
                <Input placeholder="Enter the movie name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: "Description is required!" }]}
              >
                <TextArea rows={4} placeholder="Enter the description" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  label="Duration (in min)"
                  name="duration"
                  rules={[{ required: true, message: "Movie duration is required!" }]}
              >
                <Input type="number" placeholder="Enter the movie duration" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  label="Language"
                  name="language"
                  rules={[{ required: true, message: "Movie language is required!" }]}
              >
                <Select placeholder="Select Language" options={[
                  { value: "English", label: "English" },
                  { value: "Hindi", label: "Hindi" },
                  { value: "Punjabi", label: "Punjabi" },
                  { value: "Telugu", label: "Telugu" },
                  { value: "Bengali", label: "Bengali" },
                  { value: "German", label: "German" },
                ]} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  label="Release Date"
                  name="releaseDate"
                  rules={[{ required: true, message: "Release date is required!" }]}
              >
                <Input type="date" placeholder="Choose the release date" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                  label="Genre"
                  name="genre"
                  rules={[{ required: true, message: "Movie genre is required!" }]}
              >
                <Select placeholder="Select Genre" options={[
                  { value: "Action", label: "Action" },
                  { value: "Comedy", label: "Comedy" },
                  { value: "Horror", label: "Horror" },
                  { value: "Love", label: "Love" },
                  { value: "Patriot", label: "Patriot" },
                  { value: "Bhakti", label: "Bhakti" },
                  { value: "Thriller", label: "Thriller" },
                  { value: "Mystery", label: "Mystery" },
                ]} />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                  label="Poster URL"
                  name="poster"
                  rules={[{ required: true, message: "Poster URL is required!" }]}
              >
                <Input placeholder="Enter the poster URL" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                  label="Rating"
                  name="rating"
                  rules={[{ required: true, message: "Movie rating is required!" }]}
              >
                <Rate allowHalf defaultValue={0} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ fontSize: "1rem", fontWeight: "600" }}>
              Submit the Data
            </Button>
            <Button className="mt-3" block onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
  );
};

export default MovieForm;
