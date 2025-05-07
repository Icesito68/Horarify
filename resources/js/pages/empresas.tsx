import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useCentro } from '@/providers/centroProvider';
import AppLayout from '@/layouts/app-layout';

type Supermercado = {
    id?: number;
    Nombre: string;
    Direccion: string;
    NIF: string;
    Icon: string;
};

export default function Supermercados() {
    const [supermercados, setSupermercados] = useState<Supermercado[]>([]);
    const [selected, setSelected] = useState<Supermercado | null>(null);
    const { centro } = useCentro();

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [form, setForm] = useState({
        Nombre: '',
        Direccion: '',
        NIF: '',
        Icon: 'pencil',
    });

    const handleCreateSupermercado = async () => {
        try {
            const response = await axios.post('/api/supermercados', form);
            const nuevoSupermercado = response.data.data;

            setSupermercados((prev) => [...prev, nuevoSupermercado]);

            // Resetear formulario y cerrar modal
            setForm({ Nombre: '', Direccion: '', NIF: '', Icon: 'pencil' });
            setShowCreateModal(false);
        } catch (error) {
            console.error('Error al crear supermercado:', error);
        }
    };

    useEffect(() => {
        axios.get('/api/supermercados')
            .then(res => {
                if (Array.isArray(res.data.data)) {
                    setSupermercados(res.data.data);
                } else {
                    console.error('La respuesta no es un array:', res.data);
                }
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <AppLayout breadcrumbs={[{ title: 'Supermercados', href: '/supermercados' }]}>
            <div className="bg-background text-foreground p-6 space-y-6">
                <h1 className="text-2xl font-semibold">Gestión de Supermercados</h1>

                {/* Botones */}
                <div className="flex gap-4">
                    <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                        <DialogTrigger asChild>
                            <Button onClick={() => setShowCreateModal(true)}>Crear supermercado</Button>
                        </DialogTrigger>

                        <DialogContent className="bg-card p-6 max-w-md">
                            <DialogTitle className="mb-4">Nuevo Supermercado</DialogTitle>

                            <div className="space-y-4">
                                <Input
                                    placeholder="Nombre"
                                    value={form.Nombre}
                                    onChange={(e) => setForm({ ...form, Nombre: e.target.value })}
                                />
                                <Input
                                    placeholder="Dirección"
                                    value={form.Direccion}
                                    onChange={(e) => setForm({ ...form, Direccion: e.target.value })}
                                />
                                <Input
                                    placeholder="NIF"
                                    value={form.NIF}
                                    maxLength={9}
                                    onChange={(e) => setForm({ ...form, NIF: e.target.value })}
                                />
                                <Input
                                    placeholder="Icono (nombre de icono Lucide)"
                                    value={form.Icon}
                                    onChange={(e) => setForm({ ...form, Icon: e.target.value })}
                                />

                                <Button
                                    className="w-full"
                                    disabled={!form.Nombre || !form.Direccion || !form.NIF || !form.Icon}
                                    onClick={handleCreateSupermercado}
                                >
                                    Crear
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" disabled={!selected}>
                                <Pencil className="mr-2 h-4 w-4" /> Editar
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Editar supermercado</DialogTitle>
                            {/* Aquí formulario de edición */}
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive" disabled={!selected}>
                                <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>¿Estás seguro?</DialogTitle>
                            {/* Aquí confirmación eliminación */}
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Lista de supermercados */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {supermercados.map((supermercado) => {
                        // const IconComponent = LucideIcons[supermercado.Icon];

                        return (
                            <div
                                key={supermercado.id}
                                className={`flex items-center gap-4 p-4 rounded-lg shadow-sm border cursor-pointer ${selected?.id === supermercado.id ? 'border-primary bg-primary/10' : 'border-border bg-card'
                                    }`}
                                onClick={() => setSelected(supermercado)}
                            >
                                <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-md p-2">
                                    {/* <IconComponent className="w-6 h-6" /> */}
                                </div>
                                <div>
                                    <p className="font-medium">{supermercado.Nombre}</p>
                                    <p className="text-sm text-muted-foreground">{supermercado.Direccion}</p>
                                    <p className="text-xs text-muted-foreground">NIF: {supermercado.NIF}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
