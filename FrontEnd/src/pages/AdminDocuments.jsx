import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../api/api';
import '../Styles/BasicPage.css';
import '../Styles/AdminDocuments.css';

const AdminDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [history, setHistory] = useState({ total: 0, unanswered: 0, faq: [], history: [] });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadName, setUploadName] = useState('');
  const [uploadFile, setUploadFile] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [activeTab, setActiveTab] = useState('documents');

  const loadDocuments = async () => {
    try {
      const res = await api.get('/documents');
      setDocuments(res.data);
    } catch { setDocuments([]); }
  };

  const loadHistory = async () => {
    try {
      const res = await api.get('/documents/history');
      setHistory(res.data);
    } catch { }
  };

  useEffect(() => {
    loadDocuments();
    loadHistory();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile || !uploadName.trim()) return setFeedback('Por favor selecciona un PDF y escribe un nombre.');
    const form = new FormData();
    form.append('pdf', uploadFile);
    form.append('name', uploadName.trim());
    setUploading(true);
    setFeedback('');
    try {
      await api.post('/documents/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      setFeedback('✅ Documento cargado correctamente.');
      setUploadName('');
      setUploadFile(null);
      e.target.reset();
      loadDocuments();
    } catch (err) {
      setFeedback('❌ ' + (err.response?.data?.message || 'Error al cargar el documento.'));
    } finally {
      setUploading(false);
    }
  };

  const toggleDoc = async (id) => {
    try {
      await api.patch(`/documents/${id}/toggle`);
      loadDocuments();
    } catch { }
  };

  const deleteDoc = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este documento?')) return;
    try {
      await api.delete(`/documents/${id}`);
      loadDocuments();
    } catch { }
  };

  return (
    <>
      <Header />
      <main className="basic-page-main">
        <div className="page-container">
          <div className="page-header" style={{ textAlign: 'center' }}>
            <span className="material-symbols-outlined page-icon">admin_panel_settings</span>
            <h1 className="page-title">Panel de Administración</h1>
            <p className="page-description">Gestiona los documentos del chatbot y consulta las estadísticas de uso.</p>
          </div>

          {/* Tabs */}
          <div className="admin-tabs">
            <button className={`admin-tab ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => setActiveTab('documents')}>
              <span className="material-symbols-outlined">folder</span> Documentos
            </button>
            <button className={`admin-tab ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>
              <span className="material-symbols-outlined">bar_chart</span> Estadísticas
            </button>
          </div>

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div>
              {/* Upload Form */}
              <div className="admin-card" style={{ marginBottom: '24px' }}>
                <h3 className="admin-card-title"><span className="material-symbols-outlined">upload_file</span> Cargar Nuevo Documento PDF</h3>
                <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <input className="form-input-basic" onChange={e => setUploadName(e.target.value)} placeholder="Nombre del documento (ej. Reglamento Interno 2024)" type="text" value={uploadName} />
                  <input accept=".pdf" className="form-input-basic" onChange={e => setUploadFile(e.target.files[0])} style={{ padding: '10px' }} type="file" />
                  <button className="btn-primary" disabled={uploading} style={{ alignSelf: 'flex-start', padding: '12px 24px' }} type="submit">
                    {uploading ? 'Cargando...' : 'Subir Documento'}
                  </button>
                  {feedback && <p style={{ color: feedback.startsWith('✅') ? '#16A34A' : '#DC2626', fontSize: '14px' }}>{feedback}</p>}
                </form>
              </div>

              {/* Documents List */}
              <div className="admin-card">
                <h3 className="admin-card-title"><span className="material-symbols-outlined">description</span> Documentos Cargados ({documents.length})</h3>
                {documents.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', textAlign: 'center', padding: '24px' }}>No hay documentos cargados aún.</p>
                ) : (
                  <div className="doc-list">
                    {documents.map(doc => (
                      <div className="doc-item" key={doc.id}>
                        <div className="doc-info">
                          <span className="material-symbols-outlined doc-icon">picture_as_pdf</span>
                          <div>
                            <p className="doc-name">{doc.name}</p>
                            <p className="doc-meta">{doc.fileName} • {new Date(doc.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="doc-actions">
                          <span className={`doc-status ${doc.isActive ? 'active' : 'inactive'}`}>
                            {doc.isActive ? 'Activo' : 'Inactivo'}
                          </span>
                          <button className="doc-btn toggle-btn" onClick={() => toggleDoc(doc.id)} title={doc.isActive ? 'Desactivar' : 'Activar'}>
                            <span className="material-symbols-outlined">{doc.isActive ? 'toggle_on' : 'toggle_off'}</span>
                          </button>
                          <button className="doc-btn delete-btn" onClick={() => deleteDoc(doc.id)} title="Eliminar">
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <div>
              <div className="content-grid" style={{ marginBottom: '24px' }}>
                <div className="content-card" style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '48px', fontWeight: '700', color: 'var(--secondary)', margin: '0' }}>{history.total}</p>
                  <p className="card-text">Consultas Totales</p>
                </div>
                <div className="content-card" style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '48px', fontWeight: '700', color: '#EF4444', margin: '0' }}>{history.unanswered}</p>
                  <p className="card-text">Sin Respuesta Encontrada</p>
                </div>
                <div className="content-card" style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '48px', fontWeight: '700', color: '#16A34A', margin: '0' }}>{documents.filter(d => d.isActive).length}</p>
                  <p className="card-text">Documentos Activos</p>
                </div>
              </div>

              <div className="admin-card">
                <h3 className="admin-card-title"><span className="material-symbols-outlined">trending_up</span> Preguntas Más Frecuentes</h3>
                {history.faq.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>No hay datos aún.</p>
                ) : (
                  <div className="faq-list">
                    {history.faq.map((item, i) => (
                      <div className="faq-item" key={i}>
                        <span className="faq-rank">#{i + 1}</span>
                        <p className="faq-question">{item.question}</p>
                        <span className="faq-count">{item.count}x</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdminDocuments;
