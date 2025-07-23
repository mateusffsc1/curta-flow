import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Filter, Mail, Phone, Building, Calendar, User, MessageSquare, TrendingUp, Eye } from "lucide-react";

export default function Prospects() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrigin, setSelectedOrigin] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - será substituído por dados reais da API
  const prospects = [
    {
      id: 1,
      name: "Tech Innovations",
      company: "Tech Innovations Ltda",
      email: "contato@techinnovations.com",
      phone: "(11) 99999-1111",
      origin: "Instagram",
      interest: "Identidade Visual",
      status: "novo",
      responsibleId: 1,
      responsibleName: "João Silva",
      lastContact: "2024-01-14",
      notes: "Empresa de tecnologia interessada em rebranding completo",
      interactions: 2
    },
    {
      id: 2,
      name: "Café Central",
      company: "Café Central",
      email: "admin@cafecentral.com.br",
      phone: "(11) 88888-2222",
      origin: "Indicação",
      interest: "Site + Redes Sociais",
      status: "negociando",
      responsibleId: 4,
      responsibleName: "Ana Lima",
      lastContact: "2024-01-13",
      notes: "Cafeteria que quer presença digital. Orçamento: R$ 8-15k",
      interactions: 5
    },
    {
      id: 3,
      name: "Consultoria Prime",
      company: "Prime Consultoria",
      email: "info@primeconsultoria.com.br",
      phone: "(11) 77777-3333",
      origin: "Site",
      interest: "Logo + Material Gráfico",
      status: "convertido",
      responsibleId: 2,
      responsibleName: "Maria Santos",
      lastContact: "2024-01-10",
      notes: "Cliente convertido! Projeto iniciado em Jan/2024",
      interactions: 8
    },
    {
      id: 4,
      name: "Fitness Plus",
      company: "Academia Fitness Plus",
      email: "contato@fitnessplus.com.br",
      phone: "(11) 66666-4444",
      origin: "Facebook",
      interest: "Campanha Digital",
      status: "perdido",
      responsibleId: 3,
      responsibleName: "Pedro Costa",
      lastContact: "2024-01-05",
      notes: "Optou por concorrente devido ao preço",
      interactions: 3
    },
    {
      id: 5,
      name: "EcoSolutions",
      company: "EcoSolutions Brasil",
      email: "hello@ecosolutions.com.br",
      phone: "(11) 55555-5555",
      origin: "LinkedIn",
      interest: "Site Institucional",
      status: "novo",
      responsibleId: 1,
      responsibleName: "João Silva",
      lastContact: "2024-01-15",
      notes: "Startup de sustentabilidade em crescimento",
      interactions: 1
    }
  ];

  const statusColumns = [
    { id: "novo", title: "Novos Leads", color: "secondary", icon: TrendingUp },
    { id: "negociando", title: "Em Negociação", color: "warning", icon: MessageSquare },
    { id: "convertido", title: "Convertidos", color: "success", icon: User },
    { id: "perdido", title: "Perdidos", color: "destructive", icon: Eye }
  ];

  const getProspectsByStatus = (status: string) => {
    return prospects.filter(prospect => prospect.status === status);
  };

  const getOriginColor = (origin: string) => {
    switch (origin) {
      case 'Instagram': return 'default';
      case 'Facebook': return 'warning';
      case 'LinkedIn': return 'secondary';
      case 'Site': return 'success';
      case 'Indicação': return 'default';
      default: return 'secondary';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredProspects = prospects.filter(prospect => {
    const matchesSearch = prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prospect.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || prospect.status === selectedStatus;
    const matchesOrigin = selectedOrigin === "all" || prospect.origin === selectedOrigin;
    return matchesSearch && matchesStatus && matchesOrigin;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CRM - Prospects</h1>
          <p className="text-muted-foreground">Gerencie leads e oportunidades de negócio</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Prospect
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Input 
          placeholder="Buscar prospects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="novo">Novos</SelectItem>
            <SelectItem value="negociando">Negociando</SelectItem>
            <SelectItem value="convertido">Convertidos</SelectItem>
            <SelectItem value="perdido">Perdidos</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedOrigin} onValueChange={setSelectedOrigin}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Origem" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="Instagram">Instagram</SelectItem>
            <SelectItem value="Facebook">Facebook</SelectItem>
            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            <SelectItem value="Site">Site</SelectItem>
            <SelectItem value="Indicação">Indicação</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {statusColumns.map((column) => {
          const count = getProspectsByStatus(column.id).length;
          const IconComponent = column.icon;
          return (
            <Card key={column.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{column.title}</CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{count}</div>
                <p className="text-xs text-muted-foreground">
                  prospects
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CRM Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusColumns.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{column.title}</h3>
              <Badge variant={column.color as any}>
                {getProspectsByStatus(column.id).length}
              </Badge>
            </div>
            
            <div className="space-y-3">
              {getProspectsByStatus(column.id).map((prospect) => (
                <Card key={prospect.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                            {getInitials(prospect.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-sm">{prospect.name}</CardTitle>
                          <CardDescription className="text-xs">
                            {prospect.company}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={getOriginColor(prospect.origin) as any} className="text-xs">
                        {prospect.origin}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">
                        <strong>Interesse:</strong> {prospect.interest}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {prospect.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {prospect.phone}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="h-3 w-3" />
                        {prospect.responsibleName}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Último contato: {new Date(prospect.lastContact).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MessageSquare className="h-3 w-3" />
                        {prospect.interactions} interações
                      </div>
                    </div>
                    
                    {prospect.notes && (
                      <div className="p-2 bg-muted rounded text-xs">
                        {prospect.notes}
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs">
                        Ver Histórico
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-xs">
                        Contatar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Conversion Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((getProspectsByStatus('convertido').length / prospects.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {getProspectsByStatus('convertido').length} de {prospects.length} prospects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Melhor Origem</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Instagram</div>
            <p className="text-xs text-muted-foreground">
              Mais prospects convertidos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 12.5k</div>
            <p className="text-xs text-muted-foreground">
              Valor médio dos convertidos
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}