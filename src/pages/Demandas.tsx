import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Filter, Clock, User, Building } from "lucide-react";

export default function Demandas() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedClient, setSelectedClient] = useState("all");

  // Mock data - será substituído por dados reais da API
  const tasks = [
    {
      id: 1,
      title: "Logo da empresa XYZ",
      description: "Criação de identidade visual completa",
      status: "em_andamento",
      client: "Empresa XYZ",
      assignedTo: "João Designer",
      deadline: "2024-01-15",
      priority: "alta"
    },
    {
      id: 2,
      title: "Site institucional",
      description: "Desenvolvimento de site responsivo",
      status: "aprovacao",
      client: "Startup ABC",
      assignedTo: "Maria Desenvolvedora",
      deadline: "2024-01-16",
      priority: "media"
    },
    {
      id: 3,
      title: "Material gráfico",
      description: "Criação de flyers e cartões de visita",
      status: "a_fazer",
      client: "Loja 123",
      assignedTo: "Pedro Designer",
      deadline: "2024-01-17",
      priority: "baixa"
    },
    {
      id: 4,
      title: "Campanha redes sociais",
      description: "Posts para Instagram e Facebook",
      status: "concluido",
      client: "Empresa XYZ",
      assignedTo: "Ana Social Media",
      deadline: "2024-01-10",
      priority: "alta"
    }
  ];

  const statusColumns = [
    { id: "a_fazer", title: "A Fazer", color: "secondary" },
    { id: "em_andamento", title: "Em Andamento", color: "warning" },
    { id: "aprovacao", title: "Em Aprovação", color: "default" },
    { id: "concluido", title: "Concluído", color: "success" }
  ];

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'destructive';
      case 'media': return 'warning';
      case 'baixa': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Demandas</h1>
          <p className="text-muted-foreground">Gerencie todas as tarefas da agência</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Demanda
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Input 
          placeholder="Buscar demandas..."
          className="max-w-sm"
        />
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="a_fazer">A Fazer</SelectItem>
            <SelectItem value="em_andamento">Em Andamento</SelectItem>
            <SelectItem value="aprovacao">Em Aprovação</SelectItem>
            <SelectItem value="concluido">Concluído</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedClient} onValueChange={setSelectedClient}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Cliente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="empresa-xyz">Empresa XYZ</SelectItem>
            <SelectItem value="startup-abc">Startup ABC</SelectItem>
            <SelectItem value="loja-123">Loja 123</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusColumns.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{column.title}</h3>
              <Badge variant={column.color as any}>
                {getTasksByStatus(column.id).length}
              </Badge>
            </div>
            
            <div className="space-y-3">
              {getTasksByStatus(column.id).map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm">{task.title}</CardTitle>
                      <Badge variant={getPriorityColor(task.priority) as any} className="text-xs">
                        {task.priority}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs line-clamp-2">
                      {task.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Building className="h-3 w-3" />
                        {task.client}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        {task.assignedTo}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(task.deadline).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}