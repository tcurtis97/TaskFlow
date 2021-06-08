import React, { useContext, useEffect } from "react";
import { Card, CardBody, CardHeader, CardText } from "reactstrap";
import { NoteContext } from "../../providers/NoteProvider";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Job.css";

const JobNote = ({ note }) => {
  const { deleteNote } = useContext(NoteContext);

  const NoteDelete = () => {
    deleteNote(note.id);
  };

  return (
    <Card className="m-4">
      <CardHeader>
        <strong>{note.userProfile.displayName}</strong>
      </CardHeader>
      <CardBody>
        <CardText>
          <strong>{note.noteText}</strong>
        </CardText>
        <CardText>
          <strong>{moment(note.createDate).format("MMMM Do YYYY")}</strong>
        </CardText>
        <div className="buttons">
          <Link to={`/note/edit/${note.id}`}>
            <Button type="button" color="primary">
              Edit
            </Button>
          </Link>
          <Button color="primary" onClick={NoteDelete} className="btn-primary">
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default JobNote;
