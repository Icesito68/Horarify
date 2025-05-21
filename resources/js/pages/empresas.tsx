import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Pencil, Trash2 } from 'lucide-react';
import { useCentro } from '@/providers/centroProvider';
import AppLayout from '@/layouts/app-layout';
import Swal from 'sweetalert2';
import { axiosPost, axiosPut } from '@/lib/axios';
import axios from 'axios';
import SupermercadoDialog from '@/components/dialog/SupermercadoDialog';

type Supermercado = {
  id?: number;
  Nombre: string;
  Direccion: string;
  NIF: string;
  Icon: string;
  user_id: number;
};

export default function Supermercados() {
  const [selected, setSelected] = useState<Supermercado | null>(null);
  const { centrosDisponibles, setCentrosDisponibles } = useCentro();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [form, setForm] = useState({
    Nombre: '',
    Direccion: '',
    NIF: '',
    Icon: 'pencil',
    user_id: 1,
  });

  const [editForm, setEditForm] = useState<Supermercado | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (selected) {
      setEditForm({ ...selected });
    }
  }, [selected]);

  const handleCreateSupermercado = async () => {
    try {
      const response = await axiosPost('api/supermercados', form);
      const nuevo = response.data.data;

      setCentrosDisponibles([...centrosDisponibles, nuevo]);
      setForm({ Nombre: '', Direccion: '', NIF: '', Icon: 'pencil', user_id: 1 });
      setShowCreateModal(false);

      Swal.fire({
        icon: 'success',
        title: 'Supermercado creado',
        text: `El supermercado "${nuevo.Nombre}" se ha creado exitosamente.`,
      });
    } catch (error) {
      console.error('Error al crear supermercado:', error);
      setShowCreateModal(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear el supermercado. Intenta nuevamente.',
      });
    }
  };

  const handleUpdateSupermercado = async () => {
    if (!editForm?.id) return;

    try {
      const response = await axiosPut(`/api/supermercados/${editForm.id}`, editForm);
      const actualizado = response.data.data;

      setCentrosDisponibles((prev) =>
        prev.map((s) => (s.id === actualizado.id ? actualizado : s))
      );
      setEditForm(null);
      setSelected(null);
      setShowEditModal(false);

      Swal.fire({
        icon: 'success',
        title: 'Supermercado actualizado',
        text: `Se actualizó correctamente "${actualizado.Nombre}".`,
      });
    } catch (error) {
      console.error('Error actualizando supermercado:', error);
      setShowEditModal(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el supermercado. Intenta nuevamente.',
      });
    }
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Supermercados', href: '/supermercados' }]}>
      <div className="bg-background text-foreground p-6 space-y-6">

        {/* Diálogos */}
        <SupermercadoDialog
          open={showCreateModal}
          onOpenChange={setShowCreateModal}
          title="Nuevo Supermercado"
          confirmLabel="Crear"
          onConfirm={handleCreateSupermercado}
          form={form}
          setForm={setForm}
        />

        {editForm && (
          <SupermercadoDialog
            open={showEditModal}
            onOpenChange={setShowEditModal}
            title="Editar Supermercado"
            confirmLabel="Guardar cambios"
            onConfirm={handleUpdateSupermercado}
            form={editForm}
            setForm={(f) => setEditForm(f)}
          />
        )}

        {/* Botones */}
        <div className="flex flex-row flex-wrap gap-2 sm:gap-4 items-center justify-start">
          <Button onClick={() => setShowCreateModal(true)}>Crear supermercado</Button>

          <Button
            variant="outline"
            disabled={!selected}
            onClick={() => {
              if (selected) {
                setEditForm({ ...selected });
                setShowEditModal(true);
              }
            }}
          >
            <Pencil className="mr-2 h-4 w-4" /> Editar
          </Button>

          <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
            <DialogTrigger asChild>
              <Button variant="destructive" disabled={!selected}>
                <Trash2 className="mr-2 h-4 w-4" /> Eliminar
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card p-4 sm:p-6 w-[90vw] max-w-md">
              <DialogTitle>¿Estás seguro?</DialogTitle>
              <p className="text-sm text-muted-foreground mb-4">
                Vas a eliminar <strong>{selected?.Nombre}</strong>. Esta acción no se puede deshacer.
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    if (!selected?.id) return;
                    try {
                      await axios.delete(`/api/supermercados/${selected.id}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                          'Content-Type': 'application/json',
                        },
                      });
                      setCentrosDisponibles((prev) =>
                        prev.filter((s) => s.id !== selected.id)
                      );
                      setSelected(null);
                      setShowDeleteModal(false);
                      Swal.fire({
                        icon: 'success',
                        title: 'Supermercado eliminado',
                        text: `Se eliminó correctamente "${selected?.Nombre}".`,
                      });
                    } catch (error) {
                      console.error('Error eliminando supermercado:', error);
                      Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo eliminar el supermercado. Intenta nuevamente.',
                      });
                    }
                  }}
                >
                  Eliminar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Lista de supermercados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {centrosDisponibles.map((supermercado) => (
            <div
              key={supermercado.id}
              className={`flex items-center gap-4 p-4 rounded-lg shadow-sm border cursor-pointer ${
                selected?.id === supermercado.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card'
              }`}
              onClick={() => setSelected(supermercado)}
            >
              <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-md p-2" />
              <div>
                <p className="font-medium">{supermercado.Nombre}</p>
                <p className="text-sm text-muted-foreground">{supermercado.Direccion}</p>
                <p className="text-xs text-muted-foreground">NIF: {supermercado.NIF}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
