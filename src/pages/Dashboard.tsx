import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, TrendingUp, Users, CheckCircle, AlertCircle, Timer, FileText } from "lucide-react";

export default function Dashboard() {
  // Mock data - será substituído por dados reais da API
  const stats = {
    totalTasks: 24,
    pendingTasks: 8,
    inProgress: 6,
    completed: 10,
    clients: 12,
    todayEvents: 3
  };

  const recentTasks = [
    { id: 1, title: "Logo da empresa XYZ", client: "Empresa XYZ", status: "em_andamento", deadline: "2024-01-15" },
    { id: 2, title: "Site institucional", client: "Startup ABC", status: "aprovacao", deadline: "2024-01-16" },
    { id: 3, title: "Material gráfico", client: "Loja 123", status: "a_fazer", deadline: "2024-01-17" },
  ];

  const todayEvents = [
    { id: 1, title: "Reunião com cliente", time: "09:00", client: "Empresa XYZ" },
    { id: 2, title: "Apresentação de proposta", time: "14:30", client: "Startup ABC" },
    { id: 3, title: "Alinhamento de projeto", time: "16:00", client: "Loja 123" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'a_fazer': return 'secondary';
      case 'em_andamento': return 'warning';
      case 'aprovacao': return 'default';
      case 'concluido': return 'success';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'a_fazer': return 'A Fazer';
      case 'em_andamento': return 'Em Andamento';
      case 'aprovacao': return 'Em Aprovação';
      case 'concluido': return 'Concluído';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da sua agência</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Tarefas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              +2 desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingTasks} pendentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">
              +4 esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.clients}</div>
            <p className="text-xs text-muted-foreground">
              2 novos este mês
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Tasks */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Tarefas Recentes</CardTitle>
            <CardDescription>
              Suas tarefas mais importantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.client}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(task.status) as any}>
                      {getStatusLabel(task.status)}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(task.deadline).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Events */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Agenda de Hoje</CardTitle>
            <CardDescription>
              {todayEvents.length} compromissos agendados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex-shrink-0">
                    <CalendarDays className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.client}</p>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {event.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}