import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import BlogIcon from '@mui/icons-material/Article';  // Example icon for Blogs
import SchoolIcon from '@mui/icons-material/School'; // Example icon for Education
import BuildIcon from '@mui/icons-material/Build';   // Example icon for Skill (tool or build icon)
import WorkIcon from '@mui/icons-material/Work';     // Example icon for Project (briefcase or work icon)

const Dashboard = () => {
  const cards = [
    { title: "BLOGS", value: "3", icon: <BlogIcon sx={{ fontSize: 50, color: "#1976d2" }} /> },
    { title: "EDUCATION", value: "Courses", icon: <SchoolIcon sx={{ fontSize: 50, color: "#4caf50" }} /> },
    { title: "SKILL", value: "Show", icon: <BuildIcon sx={{ fontSize: 50, color: "#f44336" }} /> },
    { title: "PROJECT", value: "Show", icon: <WorkIcon sx={{ fontSize: 50, color: "#ff9800" }} /> },
  ];

  return (
    <Grid container spacing={4} justifyContent="center" style={{ padding: '20px' }}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ minWidth: 275, textAlign: "center" }}>
            <CardContent>
              <div>{card.icon}</div>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="h4" color="text.secondary">
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;
