from django.db import models

from datetime import datetime
from numpy import average

# Create your models here.

ROLES = [
	('SU1', 'Поддержка (1 линия)'),
	('SU2', 'Поддержка (2 линия)'),
	('SAL', 'Менеджер по продажам'),
	('CTO', 'Технический директор')
]

JOBFORMAT = [
	('DST', 'Удаленно'),
	('OFC', 'Офис'),
	('HYB', 'Гибридный')
]

KIND = [
	('CALL', 'Звонки'),
	('IUPD', 'Актуализированые контактные данные'),
	('PROM', 'Обещания клиентов'),
	('REQU', 'Заявки клиентов'),
	('MEET', 'Встречи'),
	('PILO', 'Запущенные пилоты'),
	('RVIE', 'Глобальные ревью'),
	('AGRV', 'Валидации договоров'),
	('MKRP', 'Формирование внутреннего отчёта'),
	('CSTL', 'Письма заказчикам'),
	('RSKR', 'Отчет по оценке рисков'),
	('TCHT', 'Подготовка ТЗ'),
	('AUDT', 'Аудит технологических активов'),
	('SPRP', 'Планирование спринта')
]


class Messenger(models.Model):
	name = models.CharField(max_length=128, unique=True)

	def __str__(self):
		return self.name

	class Meta:
		ordering = ['name']


class Employee(models.Model):
	first_name = models.CharField(max_length=128)
	last_name = models.CharField(max_length=128)
	surname = models.CharField(max_length=128)
	role = models.CharField(max_length=3, choices=ROLES, default=None)
	age = models.CharField(max_length=2)
	city = models.CharField(max_length=128)
	job_start = models.DateField()
	job_format = models.CharField(
		max_length=3, choices=JOBFORMAT, default='OFC')
	email = models.CharField(max_length=128, unique=True)
	phone = models.CharField(max_length=16, unique=True)
	messengers = models.ManyToManyField(Messenger)

	@property
	def rating(self):
		mp_objects = [p.rating for p in self.month_plans.exclude(date__month=datetime.now().month)]
		average_efficiency = round(average(mp_objects), 1)
		return average_efficiency
	
	@property
	def month_efficiency(self):
		effective_months = [p.rating for p in self.month_plans.exclude(date__month=datetime.now().month) if p.rating >= 8]
		return round(len(effective_months)/self.experience, 2)*100
	

	@property
	def experience(self):
		now = datetime.now()
		start = self.job_start
		return (now.year - start.year)*12 + now.month - start.month

	def __str__(self):
		return self.last_name + " " + self.first_name + " " + self.surname

	class Meta:
		ordering = ['last_name']


class MonthPlan(models.Model):
	employee = models.ForeignKey(Employee, related_name='month_plans', on_delete=models.CASCADE)
	date = models.DateField()
	
	@property
	def rating(self):
		plan_objects = [(p.result/p.goal) for p in self.plans.all()]
		plan_obj_efficiency = list(map((lambda x : x*10 if x <= 1 else 10), plan_objects))
		average_efficiency = round(average(plan_obj_efficiency), 1)
		return average_efficiency
	
	def __str__(self):
		return self.date.strftime("%d/%m/%Y") + " " + self.employee.last_name
	
	class Meta:
		ordering = ['date']


class Plan(models.Model):
	task = models.CharField(max_length=4, choices=KIND, default=None)
	goal = models.IntegerField()
	result = models.IntegerField()
	month_plan = models.ForeignKey(MonthPlan, related_name='plans', on_delete=models.CASCADE)

	def __str__(self):
		return self.get_task_display() + " " + self.month_plan.date.strftime("%d/%m/%Y") + " " + self.month_plan.employee.surname

	class Meta:
		ordering = ['month_plan']

