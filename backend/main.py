from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import get_db
from crud import get_all_projects

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/projects")
def read_projects():
    return get_all_projects()


class ProjectCreate(BaseModel):
    client_id: int
    project_name: str
    start_date: str
    end_date: str


@app.post("/projects")
def create_project(project: ProjectCreate):
    conn = get_db()
    cursor = conn.cursor()

    query = """
    INSERT INTO Projects (client_id, project_name, start_date, end_date)
    VALUES (%s, %s, %s, %s)
    """

    cursor.execute(query, (
        project.client_id,
        project.project_name,
        project.start_date,
        project.end_date
    ))

    conn.commit()
    cursor.close()
    conn.close()

    return {"message": "Project created successfully"}