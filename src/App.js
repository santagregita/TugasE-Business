import { useState, useEffect } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item, index) => ({
          id: index + 1,
          nama: item.name,
          email: item.email,
          jurusan: index % 2 === 0 ? "Sistem Informasi" : "Teknik Informatika",
        }));
        setStudents(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Gagal mengambil data API:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9fafc",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "30px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ color: "#007bff" }}>📚 Daftar Mahasiswa</h1>
        <h3 style={{ color: "#555", marginBottom: "20px" }}>
          (Studi Kasus: Sistem Informasi Akademik)
        </h3>

        {loading ? (
          <p
            style={{
              fontSize: "18px",
              color: "#888",
              marginTop: "20px",
            }}
          >
            Sedang memuat data mahasiswa...
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "16px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  textAlign: "left",
                }}
              >
                <th style={{ padding: "12px" }}>No</th>
                <th style={{ padding: "12px" }}>Nama Mahasiswa</th>
                <th style={{ padding: "12px" }}>Email</th>
                <th style={{ padding: "12px" }}>Jurusan</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  style={{
                    backgroundColor:
                      student.id % 2 === 0 ? "#f2f6fc" : "white",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e3efff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      student.id % 2 === 0 ? "#f2f6fc" : "white")
                  }
                >
                  <td style={{ padding: "12px" }}>{student.id}</td>
                  <td style={{ padding: "12px" }}>{student.nama}</td>
                  <td style={{ padding: "12px" }}>{student.email}</td>
                  <td style={{ padding: "12px" }}>{student.jurusan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <footer
        style={{
          textAlign: "center",
          marginTop: "30px",
          color: "#666",
          fontSize: "14px",
        }}
      >
        © 2025 Sistem Informasi Akademik - Dibuat dengan 💙 React.js
      </footer>
    </div>
  );
}

export default App;
