import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, User, Edit, Plus, Trash2, CheckCircle, Clock } from "lucide-react";

export default function Atividades() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("all");

  // Mock data - será substituído por dados reais da API
  const activities = [
    {
      id: 1,
      userId: 1,
      userName: "João Silva",
      action: "criou_tarefa",
      entity: "tasks",
      entityId: "task-123",
      details: "Criou a tarefa 'Logo da empresa XYZ'",
      createdAt: "2024-01-15T10:30:00"
    },
    {
      id: 2,
      userId: 2,
      userName: "Maria Santos",
      action: "concluiu_tarefa",
      entity: "tasks",
      entityId: "task-120",
      details: "Concluiu a tarefa 'Site institucional'",
      createdAt: "2024-01-15T09:15:00"
    },
    {
      id: 3,
      userId: 3,
      userName: "Pedro Costa",
      action: "criou_evento",
      entity: "calendar_events",
      entityId: "event-456",
      details: "Agendou reunião com cliente Empresa XYZ",
      createdAt: "2024-01-15T08:45:00"
    },
    {
      id: 4,
      userId: 4,
      userName: "Ana Lima",
      action: "editou_cliente",
      entity: "clients",
      entityId: "client-789",
      details: "Atualizou informações do cliente Startup ABC",
      createdAt: "2024-01-14T16:20:00"
    },
    {
      id: 5,
      userId: 1,
      userName: "João Silva",
      action: "criou_cliente",
      entity: "clients",
      entityId: "client-101",
      details: "Adicionou novo cliente 'Tech Solutions'",
      createdAt: "2024-01-14T14:10:00"
    },
    {
      id: 6,
      userId: 2,
      userName: "Maria Santos",
      action: "editou_tarefa",
      entity: "tasks",
      entityId: "task-115",
      details: "Moveu tarefa 'Material gráfico' para Em Andamento",
      createdAt: "2024-01-14T11:30:00"
    }
  ];

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'criou_tarefa':
      case 'criou_cliente':
      case 'criou_evento':
        return <Plus className="h-4 w-4" />;
      case 'editou_tarefa':
      case 'editou_cliente':
        return <Edit className="h-4 w-4" />;
      case 'concluiu_tarefa':
        return <CheckCircle className="h-4 w-4" />;
      case 'excluiu_tarefa':
      case 'excluiu_cliente':
        return <Trash2 className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'criou_tarefa':
      case 'criou_cliente':
      case 'criou_evento':
        return 'success';
      case 'editou_tarefa':
      case 'editou_cliente':
        return 'warning';
      case 'concluiu_tarefa':
        return 'success';
      case 'excluiu_tarefa':
      case 'excluiu_cliente':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'criou_tarefa': return 'Criou Tarefa';
      case 'editou_tarefa': return 'Editou Tarefa';
      case 'concluiu_tarefa': return 'Concluiu Tarefa';
      case 'excluiu_tarefa': return 'Excluiu Tarefa';
      case 'criou_cliente': return 'Criou Cliente';
      case 'editou_cliente': return 'Editou Cliente';
      case 'excluiu_cliente': return 'Excluiu Cliente';
      case 'criou_evento': return 'Criou Evento';
      default: return action;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora mesmo';
    if (diffInMinutes < 60) return `${diffInMinutes}min atrás`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d atrás`;
    
    return date.toLocaleDateString('pt-BR');
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = selectedAction === "all" || activity.action === selectedAction;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Atividades</h1>
        <p className="text-muted-foreground">Histórico de ações da equipe</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Buscar atividades..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedAction} onValueChange={setSelectedAction}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Tipo de ação" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as ações</SelectItem>
            <SelectItem value="criou_tarefa">Criou Tarefa</SelectItem>
            <SelectItem value="editou_tarefa">Editou Tarefa</SelectItem>
            <SelectItem value="concluiu_tarefa">Concluiu Tarefa</SelectItem>
            <SelectItem value="criou_cliente">Criou Cliente</SelectItem>
            <SelectItem value="editou_cliente">Editou Cliente</SelectItem>
            <SelectItem value="criou_evento">Criou Evento</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Activities Timeline */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <Card key={activity.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(activity.userName)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={getActionColor(activity.action) as any} className="gap-1">
                      {getActionIcon(activity.action)}
                      {getActionLabel(activity.action)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm font-medium">{activity.userName}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {activity.details}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDateTime(activity.createdAt)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atividades Hoje</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activities.filter(a => 
                new Date(a.createdAt).toDateString() === new Date().toDateString()
              ).length}
            </div>
            <p className="text-xs text-muted-foreground">
              +2 desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas Criadas</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activities.filter(a => a.action === 'criou_tarefa').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarefas Concluídas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activities.filter(a => a.action === 'concluiu_tarefa').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuário Mais Ativo</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">João</div>
            <p className="text-xs text-muted-foreground">
              {activities.filter(a => a.userName === 'João Silva').length} ações
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}