"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  resetFiltros,
  setBusqueda,
  setCategoria,
  setDisponibilidad,
  setIdioma,
  setOrden,
  setOrdenarPor,
} from "@/lib/redux/slices/filtrosSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Search, X } from "lucide-react";

const categorias = [
  "Ficción",
  "Historia",
  "Infantil",
  "Ciencia",
  "Filosofía",
  "Tecnología",
];

const idiomas = [
  "Español",
  "Inglés",
  "Francés",
  "Alemán",
  "Italiano",
  "Portugués",
  "Otro",
];

export function FiltrosLibros() {
  const dispatch = useAppDispatch();
  const filtros = useAppSelector((state) => state.filtros);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Filtros</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => dispatch(resetFiltros())}
        >
          <X className="h-4 w-4 mr-1" />
          Limpiar
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Búsqueda */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por título, autor..."
            className="pl-10"
            value={filtros.busqueda}
            onChange={(e) => dispatch(setBusqueda(e.target.value))}
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="text-sm font-medium mb-2 block">Categoría</label>
          <select
            className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
            value={filtros.categoria}
            onChange={(e) => dispatch(setCategoria(e.target.value))}
          >
            <option value="">Todas</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Idioma */}
        <div>
          <label className="text-sm font-medium mb-2 block">Idioma</label>
          <select
            className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
            value={filtros.idioma}
            onChange={(e) => dispatch(setIdioma(e.target.value))}
          >
            <option value="">Todos</option>
            {idiomas.map((idioma) => (
              <option key={idioma} value={idioma}>
                {idioma}
              </option>
            ))}
          </select>
        </div>

        {/* Disponibilidad */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Disponibilidad
          </label>
          <select
            className="w-full h-9 rounded-md border border-input bg-transparent px-3 text-sm"
            value={filtros.disponibilidad}
            onChange={(e) => dispatch(setDisponibilidad(e.target.value as any))}
          >
            <option value="todos">Todos</option>
            <option value="disponibles">Disponibles</option>
            <option value="prestados">Prestados</option>
          </select>
        </div>

        {/* Ordenar */}
        <div>
          <label className="text-sm font-medium mb-2 block">Ordenar por</label>
          <div className="flex gap-2">
            <select
              className="flex-1 h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              value={filtros.ordenarPor}
              onChange={(e) => dispatch(setOrdenarPor(e.target.value as any))}
            >
              <option value="reciente">Más reciente</option>
              <option value="titulo">Título</option>
              <option value="autor">Autor</option>
              <option value="prestamos">Préstamos</option>
              <option value="rating">Rating</option>
            </select>
            <select
              className="w-24 h-9 rounded-md border border-input bg-transparent px-3 text-sm"
              value={filtros.orden}
              onChange={(e) => dispatch(setOrden(e.target.value as any))}
            >
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
