"use client";
import { useState } from "react";
import { Button } from "./shad/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./shad/ui/card";
import { Problem } from "@prisma/client";
import { Input } from "./shad/ui/input";
import { updateProblem } from "../../../apps/web/components/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./shad/ui/select";

const ProblemCard = ({ problem }: { problem: Problem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(problem.title);
  const [description, setDescription] = useState(problem.description);
  const [type, setType] = useState(problem.type);
  const [notionDocId, setNotionDocId] = useState(problem.notionDocId);
  function handleEdit(id: string) {
    if (isEditing) {
      updateProblem(id, { title, description, type, notionDocId });
      return setIsEditing(false);
    }
    setIsEditing(true);
  }
  function handleDiscardButton() {
    setTitle(problem.title);
    setDescription(problem.description);
    setType(problem.type);
    setNotionDocId(problem.notionDocId);
    setIsEditing(false);
  }
  return (
    <Card key={problem.id}>
      {!isEditing && (
        <div>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>{title}</CardTitle>
              <Button variant={"outline"} className="" onClick={() => handleEdit(problem.id)}>
                Edit
              </Button>
            </div>
            <CardDescription>{description}</CardDescription>
            <CardDescription>{type}</CardDescription>
          </CardHeader>
          <CardContent>{notionDocId}</CardContent>
        </div>
      )}
      {isEditing && (
        <div>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>
                <Input onChange={(e) => setTitle(e.target.value)} value={title} />
              </CardTitle>
              <div className="space-x-3">
                <Button variant={"outline"} className="" onClick={() => handleDiscardButton()}>
                  Discard
                </Button>
                <Button variant={"outline"} className="" onClick={() => handleEdit(problem.id)}>
                  Save
                </Button>
              </div>
            </div>
            <CardDescription>
              <Input onChange={(e) => setDescription(e.target.value)} value={description} />
            </CardDescription>
            <CardDescription>
              <Select
                onValueChange={(e: "Blog" | "Code" | "MCQ") => {
                  setType(e);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Code">Code</SelectItem>
                  <SelectItem value="Blog">Blog</SelectItem>
                  <SelectItem value="MCQ">MCQ</SelectItem>
                </SelectContent>
              </Select>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input onChange={(e) => setNotionDocId(e.target.value)} value={notionDocId} />
          </CardContent>
        </div>
      )}
    </Card>
  );
};

export default ProblemCard;
