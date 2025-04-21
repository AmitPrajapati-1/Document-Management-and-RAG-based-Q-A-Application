import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseAsync } from 'docx-preview';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import * as pdfjsLib from 'pdfjs-dist';

const Dashboard = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState('documents');
  const [documents, setDocuments] = useState([]);
  const [newDoc, setNewDoc] = useState({ title: '', content: '', tags: [] });
  const [question, setQuestion] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [answer, setAnswer] = useState('');
  const email = localStorage.getItem('email');

  const fetchDocuments = () => {
    const token = localStorage.getItem('token');
    fetch('https://document-management-and-rag-based-q-a.onrender.com/api/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.documents) setDocuments(data.documents);
        if (data.message) setMessage(data.message);
      })
      .catch(() => {
        localStorage.clear();
        navigate('/');
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }
    fetchDocuments();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleUpload = () => {
    const token = localStorage.getItem('token');
    if (newDoc.title && newDoc.content) {
      fetch('https://document-management-and-rag-based-q-a.onrender.com/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newDoc),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            alert('Document uploaded successfully!');
            setNewDoc({ title: '', content: '', tags: [] });
            setFileContent('');
            fetchDocuments();
            setTab('documents');
          }
        })
        .catch((err) => {
          console.error('Upload error:', err);
          alert('Error uploading document!');
        });
    }
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    fetch(`https://document-management-and-rag-based-q-a.onrender.com/api/document/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(() => {
        setDocuments(documents.filter((doc) => doc._id !== id));
      })
      .catch((err) => {
        console.error('Delete error:', err);
        alert('Error deleting document!');
      });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
          const typedarray = new Uint8Array(reader.result);
          const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map((item) => item.str);
            fullText += strings.join(' ') + '\n';
          }
          setFileContent(fullText);
          setNewDoc({ ...newDoc, content: fullText });
        } 
        else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.docx')) {
          const docxText = await extractDocxText(reader.result);
          setFileContent(docxText);
          setNewDoc({ ...newDoc, content: docxText });
        } 
        else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
          const text = reader.result;
          setFileContent(text);
          setNewDoc({ ...newDoc, content: text });
        } 
        else {
          alert('Unsupported file type. Please upload PDF, DOCX, or TXT.');
        }
      } catch (err) {
        console.error('File reading error:', err);
        alert('Error processing file.');
      }
    };

    reader.onerror = () => {
      alert('Error reading file.');
    };

    reader.readAsArrayBuffer(file);
  };

  const extractDocxText = async (arrayBuffer) => {
    let textContent = '';
    await parseAsync(arrayBuffer, {
      onParagraph: (para) => {
        textContent += para.text + '\n';
      }
    });
    return textContent;
  };

  const askQuestion = async () => {
    if (!question.trim()) return;

    try {
      setAnswer('Loading...'); 
      const response = await fetch('https://document-management-and-rag-based-q-a.onrender.com/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          documents: documents.map((doc) => ({
            title: doc.title,
            content: doc.content
          }))
        })
      });

      const data = await response.json();
      console.log('Response:', data);
      if (data.answer) {
        setAnswer(data.answer);
      } else {
        setAnswer('No answer generated.');
      }
    } catch (error) {
      console.error('Error asking question:', error);
      setAnswer('Error fetching answer.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">DocuQA Oasis</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{email}</span>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </div>

      <p className="mb-4 text-gray-700">{message}</p>

      <div className="bg-white rounded-2xl shadow p-4">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setTab('documents')}
            className={`px-4 py-2 ${tab === 'documents' ? 'border-b-2 border-blue-500 text-blue-600 font-semibold' : 'text-gray-500'}`}
          >
            Documents
          </button>
          <button
            onClick={() => setTab('upload')}
            className={`px-4 py-2 ${tab === 'upload' ? 'border-b-2 border-blue-500 text-blue-600 font-semibold' : 'text-gray-500'}`}
          >
            Upload
          </button>
        </div>

        {/* Content */}
        <div className="flex mt-4">
          {/* Left Panel */}
          <div className="w-1/2 pr-4 border-r">
            {tab === 'documents' && (
              <>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">Documents</h2>
                  <span className="text-gray-400 text-sm">{documents.length} documents</span>
                </div>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc._id} className="p-4 bg-gray-100 rounded-lg relative">
                      <h3 className="font-semibold">{doc.title}</h3>
                      <p className="text-sm text-gray-600 truncate">{doc.content}</p>
                      <button
                        onClick={() => handleDelete(doc._id)}
                        className="absolute top-2 right-2 text-red-500"
                      >
                        🗑
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === 'upload' && (
              <>
                <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
                <input
                  type="text"
                  placeholder="Enter document title"
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                  className="w-full p-2 mb-4 border rounded-lg"
                />
                <textarea
                  placeholder="Enter document content"
                  value={newDoc.content || fileContent}
                  onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
                  className="w-full p-2 mb-4 border rounded-lg h-32"
                />
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="w-full p-2 mb-4 border rounded-lg"
                  accept=".pdf,.docx,.txt"
                />
                <input
                  type="text"
                  placeholder="Add tags"
                  className="w-full p-2 mb-4 border rounded-lg"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      setNewDoc({ ...newDoc, tags: [...newDoc.tags, e.target.value] });
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  onClick={handleUpload}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg"
                >
                  Upload Document
                </button>
              </>
            )}
          </div>

          {/* Right Panel */}
          <div className="w-1/2 pl-4">
            <h2 className="text-xl font-semibold mb-4">Document Q&A</h2>
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg mb-4 p-4 overflow-y-auto">
              {answer ? (
                <p className="text-gray-700 whitespace-pre-wrap">{answer}</p>
              ) : (
                <p className="text-gray-400">No questions yet</p>
              )}
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Ask a question about your documents..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="flex-1 p-2 border rounded-l-lg"
              />
              <button
                onClick={askQuestion}
                className="bg-purple-400 p-2 rounded-r-lg text-white"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
