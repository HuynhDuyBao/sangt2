import React, { useEffect, useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import API from '../../api/axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';

function AdminGenres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');

  const fetchGenres = async () => {
    setLoading(true);
    try {
      const res = await API.get('/admin/genres');
      setGenres(res.data);
    } catch { toast.error('Lỗi tải danh sách'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchGenres(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) { toast.error('Tên thể loại không được trống'); return; }
    try {
      if (editing) {
        await API.put(`/admin/genres/${editing._id}`, { TenTheLoai: name });
        toast.success('Đã cập nhật');
      } else {
        await API.post('/admin/genres', { TenTheLoai: name });
        toast.success('Đã thêm');
      }
      setShowModal(false);
      setEditing(null);
      setName('');
      fetchGenres();
    } catch (err) { toast.error(err.response?.data?.message || 'Lỗi'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Xóa thể loại này?')) return;
    try { await API.delete(`/admin/genres/${id}`); toast.success('Đã xóa'); fetchGenres(); }
    catch { toast.error('Lỗi khi xóa'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Quản lý thể loại</h2>
        <button onClick={() => { setEditing(null); setName(''); setShowModal(true); }}
          className="flex items-center space-x-2 bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition">
          <FiPlus /> <span>Thêm</span>
        </button>
      </div>

      {loading ? <LoadingSpinner /> : (
        <div className="bg-dark-100 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-gray-400 px-4 py-3 font-medium">#</th>
                <th className="text-left text-gray-400 px-4 py-3 font-medium">Tên thể loại</th>
                <th className="text-right text-gray-400 px-4 py-3 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {genres.map((g, i) => (
                <tr key={g._id} className="border-b border-gray-800/50 hover:bg-dark-400/50">
                  <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 text-white">{g.TenTheLoai}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => { setEditing(g); setName(g.TenTheLoai); setShowModal(true); }}
                        className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg"><FiEdit2 size={16} /></button>
                      <button onClick={() => handleDelete(g._id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"><FiTrash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-100 rounded-xl w-full max-w-sm">
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">{editing ? 'Sửa thể loại' : 'Thêm thể loại'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><FiX size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Tên thể loại</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-dark-400 text-white px-3 py-2 rounded-lg border border-gray-700 text-sm" autoFocus />
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">Hủy</button>
                <button type="submit" className="px-6 py-2 bg-primary hover:bg-red-700 text-white rounded-lg text-sm">{editing ? 'Cập nhật' : 'Thêm'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminGenres;
