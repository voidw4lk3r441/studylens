import React, { useEffect, useState } from 'react';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line
} from 'recharts';

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [subject, setSubject] = useState("physics");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Theme
  const theme = {
    background: darkMode ? '#0f172a' : '#f8fafc',
    card: darkMode ? '#1e293b' : '#ffffff',
    text: darkMode ? '#f1f5f9' : '#1e293b',
    secondary: darkMode ? '#94a3b8' : '#64748b'
  };

  // Card Styles
  const cardStyle = {
    background: theme.card,
    color: theme.text,
    padding: '24px',
    borderRadius: '16px',
    flex: 1,
    minWidth: '280px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
  };

  const chartCard = {
    background: theme.card,
    color: theme.text,
    padding: '24px',
    borderRadius: '16px',
    flex: 1,
    minWidth: '350px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
  };

  // Fetch Data
  useEffect(() => {
    setLoading(true);

    fetch(`http://127.0.0.1:8000/api/analysis/${subject}`)
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });

  }, [subject]);

  // Loading Screen
  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "120px",
          fontFamily: "Arial",
          background: theme.background,
          color: theme.text,
          minHeight: "100vh",
          paddingTop: "100px"
        }}
      >
        <h2>🧠 StudyLens AI Engine</h2>
        <p>Analyzing answer sheet...</p>
        <p>Detecting conceptual weaknesses...</p>
        <p>Generating behavioral insights...</p>
      </div>
    );
  }

  // Safety Check
  if (!data) {
    return (
      <div style={{ padding: "40px" }}>
        Failed to load backend data.
      </div>
    );
  }

  return (

    <div
      style={{
        fontFamily: 'Segoe UI',
        padding: '30px',
        background: theme.background,
        minHeight: '100vh',
        color: theme.text,
        transition: '0.3s ease'
      }}
    >

      {/* Dark Mode Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          padding: '10px 16px',
          borderRadius: '10px',
          border: 'none',
          cursor: 'pointer',
          background: darkMode ? '#334155' : '#e2e8f0',
          color: darkMode ? '#fff' : '#000',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}
      >
        {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginBottom: '30px'
        }}
      >

        <div>
          <h1
            style={{
              margin: 0,
              fontSize: '2rem',
              fontWeight: '800',
              background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px',
              marginBottom: '8px'
            }}
          >
            StudyLens Analytics
          </h1>

          <p
            style={{
              color: theme.secondary,
              fontSize: '1rem',
              marginTop: '6px',
              marginBottom: '6px'
            }}
>
            {data.testName} • Student:
            <strong> {data.studentName}</strong>
          </p>

          <small style={{ color: '#2563eb' }}>
            Turning mistakes into measurable improvement.
          </small>
        </div>

        {/* Subject Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {["physics", "chemistry", "math"].map((sub) => (

            <button
              key={sub}
              onClick={() => setSubject(sub)}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                background:
                  subject === sub ? '#2563eb' : '#e2e8f0',
                color:
                  subject === sub ? '#fff' : '#000',
                fontWeight: 'bold'
              }}
            >
              {sub.toUpperCase()}
            </button>

          ))}
        </div>

      </div>

      {/* Upload Area */}
      <div
        style={{
          background: theme.card,
          color: theme.text,
          border:
            darkMode
              ? '2px dashed #475569'
              : '2px dashed #94a3b8',
          padding: '24px',
          borderRadius: '16px',
          textAlign: 'center',
          marginBottom: '30px'
        }}
      >
        <h3>📄 Upload OMR / PDF Answer Sheet</h3>

        <p style={{ color: theme.secondary }}>
          Drag and drop files here for AI-powered analysis.
        </p>

        <input type="file" />
      </div>

      {/* Metrics */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '30px'
        }}
      >

        {/* Accuracy Card */}
        <div style={cardStyle}>
          <h3>Accuracy</h3>

          <h1 style={{ color: '#2563eb' }}>
            {data.metrics.accuracy}%
          </h1>

          <p>
            {data.metrics.incorrectAnswers}
            {" "}incorrect out of{" "}
            {data.metrics.totalQuestions}
          </p>
        </div>

        {/* Recoverable Score */}
        <div
          style={{
            ...cardStyle,
            background:
              darkMode ? '#2563eb' : '#0f172a',
            color: '#fff'
          }}
        >
          <h3>Recoverable Score</h3>

          <h1 style={{ color: '#10b981' }}>
            +{data.metrics.predictedScoreImprovement} Marks
          </h1>

          <p>
            Potential improvement from fixing recurring errors.
          </p>
        </div>

      </div>

      {/* Charts */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '30px'
        }}
      >

        {/* Pie Chart */}
        <div style={chartCard}>

          <h3>Mistake Distribution</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie
                data={data.mistakeDistribution}
                dataKey="count"
                nameKey="type"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
              >
                {data.mistakeDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >

            {data.mistakeDistribution.map((item, index) => (

              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >

                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    background: item.color,
                    borderRadius: '50%'
                  }}
                />

                <span>
                  {item.type} ({item.count})
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Bar Chart */}
        <div style={chartCard}>

          <h3>Topic Mastery</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.topicWeaknesses}>

              <XAxis dataKey="topic" />
              <YAxis domain={[0, 100]} />
              <Tooltip />

              <Bar
                dataKey="score"
                fill={
                  darkMode ? "#818cf8" : "#6366f1"
                }
              />

            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Trend Graph */}
      <div
        style={{
          ...chartCard,
          marginBottom: '30px'
        }}
      >

        <h3>📈 Performance Trend</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.performanceTrend}>

            <XAxis dataKey="test" />
            <YAxis domain={[0, 100]} />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* Recommendations */}
      <div
        style={{
          background: theme.card,
          color: theme.text,
          padding: '24px',
          borderRadius: '16px',
          marginBottom: '30px'
        }}
      >

        <h3>🎯 Recommended Actions</h3>

        <ul>
          {data.recommendations.map((rec, index) => (
            <li
              key={index}
              style={{ marginBottom: '10px' }}
            >
              {rec}
            </li>
          ))}
        </ul>

      </div>

      {/* AI Insight */}
      <div
        style={{
          background:
            darkMode ? '#1e3a8a' : '#eff6ff',
          color:
            darkMode ? '#f8fafc' : '#1e293b',
          borderLeft: '6px solid #2563eb',
          padding: '24px',
          borderRadius: '16px'
        }}
      >

        <h3>💡 Deep Behavioral Insight</h3>

        <p style={{ lineHeight: '1.8' }}>
          {data.behavioralInsight}
        </p>

      </div>

    </div>
  );
}

export default App;