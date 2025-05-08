import {
    Dialog,
    DialogContent,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useEffect } from 'react';

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    handleCreateEmpleado: () => void;
    isRotativo: boolean;
    setIsRotativo: React.Dispatch<React.SetStateAction<boolean>>;
    horaInicio: string;
    minutoInicio: string;
    horaFin: string;
    minutoFin: string;
    setHoraInicio: (val: string) => void;
    setMinutoInicio: (val: string) => void;
    setHoraFin: (val: string) => void;
    setMinutoFin: (val: string) => void;
    horaInicioRot: string;
    minutoInicioRot: string;
    horaFinRot: string;
    minutoFinRot: string;
    setHoraInicioRot: (val: string) => void;
    setMinutoInicioRot: (val: string) => void;
    setHoraFinRot: (val: string) => void;
    setMinutoFinRot: (val: string) => void;
};

type FormDataEmpleado = {
    DNI: string;
    Nombre: string;
    Apellidos: string;
    Turno: string;
    Rotativo: boolean;
    Turno_Rotativo: string;
    supermercado_id: number;
    Telefono: string;
    Horas_Semanales: number;
    Dia_Libre: string;
    Especial: boolean;
    Email: string;
};

export default function DialogAddEmpleado({
    open,
    onOpenChange,
    formData,
    setFormData,
    handleCreateEmpleado,
    isRotativo,
    setIsRotativo,
    horaInicio,
    minutoInicio,
    horaFin,
    minutoFin,
    setHoraInicio,
    setMinutoInicio,
    setHoraFin,
    setMinutoFin,
    horaInicioRot,
    minutoInicioRot,
    horaFinRot,
    minutoFinRot,
    setHoraInicioRot,
    setMinutoInicioRot,
    setHoraFinRot,
    setMinutoFinRot,
}: Props) {

    useEffect(() => {
        if (horaInicio && minutoInicio && horaFin && minutoFin) {
            const inicio = `${horaInicio.padStart(2, '0')}:${minutoInicio.padStart(2, '0')}`;
            const fin = `${horaFin.padStart(2, '0')}:${minutoFin.padStart(2, '0')}`;
            setFormData((prev: FormDataEmpleado) => ({ ...prev, Turno: `${inicio} - ${fin}` }));
        }
    }, [horaInicio, minutoInicio, horaFin, minutoFin]);

    useEffect(() => {
        if (horaInicioRot && minutoInicioRot && horaFinRot && minutoFinRot && isRotativo) {
            const inicio = `${horaInicioRot.padStart(2, '0')}:${minutoInicioRot.padStart(2, '0')}`;
            const fin = `${horaFinRot.padStart(2, '0')}:${minutoFinRot.padStart(2, '0')}`;
            setFormData((prev: FormDataEmpleado) => ({ ...prev, Turno_Rotativo: `${inicio} - ${fin}` }));
        }
    }, [horaInicioRot, minutoInicioRot, horaFinRot, minutoFinRot, isRotativo]);

    const isFormValid = (): boolean => {
        const requiredFields = [
            formData.DNI,
            formData.Nombre,
            formData.Apellidos,
            formData.Email,
            formData.Telefono,
            formData.Dia_Libre,
            formData.Turno
        ];

        const allFilled = requiredFields.every((field) => field && field.trim() !== '');

        if (formData.Rotativo) {
            return allFilled && formData.Turno_Rotativo && formData.Turno_Rotativo.trim() !== '';
        }

        return allFilled;
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-transparent p-0 max-w-lg max-h-[80vh] overflow-hidden rounded-lg">
                <div className="bg-card p-6 overflow-y-auto max-h-[80vh] rounded-lg">
                    <DialogTitle className="mb-4">Nuevo Empleado</DialogTitle>
                    <InputField label="DNI" value={formData.DNI} onChange={val => setFormData({ ...formData, DNI: val })} />
                    <InputField label="Nombre" value={formData.Nombre} onChange={val => setFormData({ ...formData, Nombre: val })} />
                    <InputField label="Apellidos" value={formData.Apellidos} onChange={val => setFormData({ ...formData, Apellidos: val })} />
                    <InputField label="Email" value={formData.Email} onChange={val => setFormData({ ...formData, Email: val })} />
                    <InputField label="Teléfono" value={formData.Telefono} onChange={val => setFormData({ ...formData, Telefono: val })} />

                    <div>
                        <label className="block mb-1">Día libre</label>
                        <Select onValueChange={(value) => setFormData({ ...formData, Dia_Libre: value })}>
                            <SelectTrigger><SelectValue placeholder="Selecciona un Día libre" /></SelectTrigger>
                            <SelectContent>
                                {["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"].map((dia) => (
                                    <SelectItem key={dia} value={dia}>{dia}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <TimeRange label="Turno" start={{ hora: horaInicio, minuto: minutoInicio }} end={{ hora: horaFin, minuto: minutoFin }}
                        setStart={{ hora: setHoraInicio, minuto: setMinutoInicio }} setEnd={{ hora: setHoraFin, minuto: setMinutoFin }} />

                    <BooleanSelect label="¿Es un empleado especial?" value={formData.Especial} onChange={(v) => setFormData({ ...formData, Especial: v })} />
                    <BooleanSelect label="¿Turno rotativo?" value={formData.Rotativo} onChange={(v) => {
                        setIsRotativo(v);
                        setFormData((prev: FormDataEmpleado) => ({ ...prev, Rotativo: v }));
                    }} />

                    {isRotativo && (
                        <TimeRange label="Turno rotativo" start={{ hora: horaInicioRot, minuto: minutoInicioRot }} end={{ hora: horaFinRot, minuto: minutoFinRot }}
                            setStart={{ hora: setHoraInicioRot, minuto: setMinutoInicioRot }} setEnd={{ hora: setHoraFinRot, minuto: setMinutoFinRot }} />
                    )}

                    <Button
                        onClick={handleCreateEmpleado}
                        className="mt-4 w-full"
                        disabled={!isFormValid()}
                    >
                        Crear empleado
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    );
}

function InputField({ label, value, onChange }: { label: string; value: string; onChange: (val: string) => void }) {
    return (
        <div>
            <label className="block mb-1">{label}</label>
            <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={`Ej. ${label}`} />
        </div>
    );
}

function BooleanSelect({ label, value, onChange }: { label: string; value: boolean; onChange: (val: boolean) => void }) {
    return (
        <div>
            <label className="block mb-1">{label}</label>
            <Select onValueChange={(v) => onChange(v === 'si')}>
                <SelectTrigger><SelectValue placeholder="Sí o No" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="si">Sí</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

function TimeRange({
    label,
    start,
    end,
    setStart,
    setEnd,
}: {
    label: string;
    start: { hora: string; minuto: string };
    end: { hora: string; minuto: string };
    setStart: { hora: (val: string) => void; minuto: (val: string) => void };
    setEnd: { hora: (val: string) => void; minuto: (val: string) => void };
}) {
    return (
        <div>
            <label className="block mb-1">{label}</label>
            <div className="flex gap-2">
                <Input type="number" placeholder="HH" min="0" max="23" className="w-16" value={start.hora} onChange={(e) => setStart.hora(e.target.value)} />
                <Input type="number" placeholder="MM" min="0" max="59" className="w-16" value={start.minuto} onChange={(e) => setStart.minuto(e.target.value)} />
                <span className="self-center">-</span>
                <Input type="number" placeholder="HH" min="0" max="23" className="w-16" value={end.hora} onChange={(e) => setEnd.hora(e.target.value)} />
                <Input type="number" placeholder="MM" min="0" max="59" className="w-16" value={end.minuto} onChange={(e) => setEnd.minuto(e.target.value)} />
            </div>
        </div>
    );
}
