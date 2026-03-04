import React, { useEffect, useState } from "react";
import { fetchProjects, createProject } from "../api/projectApi";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    client_id: "",
    project_name: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await fetchProjects();
    setProjects(data);
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProject(formData);
    await loadProjects();

    setFormData({
      client_id: "",
      project_name: "",
      start_date: "",
      end_date: "",
    });
  };

  return (
    <div>
      {/* Form Section */}

      <div className="form-container">
        <h2>Create Project</h2>

        <form onSubmit={handleSubmit} className="project-form">
          <input
            type="number"
            name="client_id"
            placeholder="Client ID"
            value={formData.client_id}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="project_name"
            placeholder="Project Name"
            value={formData.project_name}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Project</button>
        </form>
      </div>

      {/* Table Section */}
      <div className="projects-section">
        <h2>Projects List</h2>

        {loading && <p>Loading projects...</p>}

        <table>
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Client ID</th>
              <th>Project Name</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>

          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="5">No projects found</td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr key={p.project_id}>
                  <td>{p.project_id}</td>
                  <td>{p.client_id}</td>
                  <td>{p.project_name}</td>
                  <td>{p.start_date}</td>
                  <td>{p.end_date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;